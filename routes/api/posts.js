const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//User Model
const Post = require('../../models/Post');
//User Model
const User = require('../../models/User');
//Pet Model
const Pet = require('../../models/Pet');
//Breed Model
const Breed = require('../../models/Breed');
//Category Model
const Category = require('../../models/Category');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', (req,res) => {
    Post.find().populate('comments').populate('pet').populate('breed').populate('category').populate('user')
    .sort({published_date: -1})
    .then(posts => res.json(posts))
});

// @route   GET api/posts/user
// @desc    Get User Posts
// @access  Private
router.get('/user', auth, (req,res) => {
    Post.find({user:req.user.id}).populate('comments').populate('pet').populate('breed').populate('category').populate('user')
    .sort({comment_date: -1})
    .then(posts => res.json(posts))
});

// @route   GET api/posts
// @desc    Get Post
// @access  Public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id).populate('comments').populate('pet').populate('breed').populate('category').populate('user')
    .then(post => res.json(post))
});

// @route   POST api/posts
// @desc    Create A Post
// @access  Private
router.post('/', auth, (req,res) => {
    const { title, body, pet, breed, category } = req.body;

    //Simple validation
    if(!title || !body || !pet || !breed || !category){
        return res.status(400).json({ msg:'Please enter all fields' });
    }
    
    User.findById(req.user.id).then(user => {
      Pet.findOne({"name":pet}).then(pet => {
        Breed.findOne({"name":breed}).then(breed => {
            Category.findOne({"name":category}).then(category => {

            const newPost = new Post({
                title,
                body,
                user,
                pet,
                breed,
                category
            });

            newPost.save().then(post => {
                Post.findOne(post).populate('pet').populate('breed').populate('category').then(post =>{
                    Post.find({user:user._id}).populate('pet').populate('breed').populate('category').then( posts => { 

                        var newUser = { posts }
                        user.updateOne(newUser).then(() => { res.json({posts,post}) });
                    })
                }) 
            });
        })
})})})
});

// @route   DELETE api/posts/user
// @desc    Delete All User Posts
// @access  Private
router.delete('/user', auth, (req,res) => {
    User.findById(req.user.id).populate('comments').select('-password').then(user => {

         Post.find({user:req.user.id}).select('_id').then( posts => {
            var postsToDelete = [];
            posts.map(post => {
                postsToDelete.push(post.id); 
            })
            User.find().select('-password').populate('comments').then(users => { 
                users.map(user => {
                    user.comments = user.comments.filter(comment => !(postsToDelete.includes(String(comment.post))));
                    user.save().then(() => {});
                })
            })

            posts.map( post =>{
                Comment.deleteMany({post:post._id}).then(posts =>{})
            })
         
            user.posts = [];
            user.save().then(() => { 
                Post.deleteMany({user:req.user.id}).then(() => res.json({success: true}))
            })
        })
    })
    .catch(err => res.status(404).json({success: false}));
});

// @route   DELETE api/posts
// @desc    Delete Post By Post Id
// @access  Private
router.delete('/:id', auth, (req,res) => {
    User.findById(req.user.id).then(CurrUser => { 

    Post.findById(req.params.id).then(post => {
        User.findById(post.user).then(user => {
            if(!CurrUser.admin && (user._id != req.user.id)){
                return res.status(400).json({ msg:'No permission, Post does not belong to the user' });
            }

            User.find().select('-password').populate('comments').then(users => { 
                users.map(user => {
                    user.comments = user.comments.filter(comment => comment.post != req.params.id);
                    user.save().then(() => {});
                })
            })

            Post.find({user:user._id}).then( posts => {
                user.posts = user.posts.filter(post => post.id != req.params.id);
                user.save().then(() => { 
                    Comment.deleteMany({post:post._id}).then(posts =>{})
                    post.deleteOne().then(() => res.json({success: true}));
                })
            })
        })
    })})
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;