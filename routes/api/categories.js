const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


//Category Model
const Category = require('../../models/Category');
//User Model
const User = require('../../models/User');
//Item Model
const Item = require('../../models/Item');

// @route   GET api/categories
// @desc    Get All Category
// @access  Public
router.get('/', (req, res) => {
    Category.find()
        .then(category => res.json(category))
});

router.post('/all', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            if (user.admin) {
                User.find().populate('pet').populate('breed')
                    .sort({ date: -1 })
                    .then(users => res.json(users))
            } else {
                return res.status(400).json({ msg: 'No permission' });
            }
        });
});

// @route   POST api/categories/edit
// @desc    Edit A category
// @access  Private
router.post('/edit/:id', auth, (req, res) => {
    User.findById(req.user.id).then(user => {
        if (!user.admin) {
            return res.status(400).json({ msg: 'No permission' });
        }

        const { name } = req.body;

        //Simple validation
        if (!name) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        Pet.findOne({ name: pet }).then(pet => {
            Breed.findOne({ name: breed }).then(breed => {
                Category.findOne({ name: category }).then(category => {

                    const newCategory = new Category({
                        name
                    });

                    Category.findById(req.params.id)
                        .then(item => {
                            item = newItem;
                            item.save().then(() => res.json({ success: true }));
                        })
                        .catch(err => res.status(404).json({ success: false }));
                })
            })
        })
    })
});

// @route   post api/categories
// @desc    Create A Category
// @access  Private
router.post('/', auth, (req, res) => {
    const { name } = req.body;

    //Simple validation
    if (!name) {
        return res.status(400).json({ msg: 'אנא הכנס את שם הקטגוריה' });
    }
    //check for existing category
    Category.findOne({ name })
        .then(category => {
            if (category) return res.status(400).json({ msg: 'הקטגוריה כבר קיימת' });
            User.findById(req.user.id)
                .select('-password')
                .then(user => {
                    if (user.admin) {
                        const newCategory = new Category({ name });
                        newCategory.save().then(category => {
                            Category.findOne(category)
                                .then(category => {
                                    res.json(category)
                                });
                        });
                    } else {
                        return res.status(400).json({ msg: 'No permission' });
                    }
                })
        })
});

// @route   DELETE api/categories
// @desc    Delete Category
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            User.findById(req.user.id)
                .select('-password')
                .then(user => {
                    if (user.admin) {
                        Item.findOne({ category }).then(item => {
                            if (item) return res.status(400).json({ msg: 'קיימים מוצרים תחת קטגוריה זו' });

                            category.deleteOne().then(() => res.json({ success: true }))
                        })
                    } else {
                        return res.status(400).json({ msg: 'No permission' });
                    }
                })
        })
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;