const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth");

//User Model
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req,res) => {
   const { email, password } = req.body;
   //Simple validation
   if(!email || !password){
        return res.status(400).json({ msg:'Please enter all fields' });
   }

   //check for existing user
   User.findOne({ email }).populate('pet').populate('breed').populate('posts').populate('comments')
   .then(user => {
       if(!user) return res.status(400).json({ msg: 'User Does not exist' });
         
        // Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {          
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            _id: user.id,
                            name: user.name,
                            admin:user.admin,
                            email: user.email,
                            cellphone:user.cellphone,
                            petImage:user.petImage,
                            pet: user.pet,
                            breed: user.breed,
                            posts: user.posts,
                            comments: user.comments
                        }
                    }); 
                }
            )
        })
   })
});

// @route   GET api/auth/user
// @desc    get user data
// @access  Private
router.get('/user', auth, (req,res) => {
    User.findById(req.user.id).populate('pet').populate('breed').populate('posts').populate('comments')
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;