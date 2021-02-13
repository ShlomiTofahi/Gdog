const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth");
const fs = require('fs')

//User Model
const User = require('../../models/User');
//Pet Model
const Pet = require('../../models/Pet');
//Breed Model
const Breed = require('../../models/Breed');

// @route   POST api/users/all
// @desc    Get All Users
// @access  Private
router.post('/all', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            if (user.admin) {
                User.find().populate('pet').populate('breed').populate('posts').populate('comments')
                    .sort({ date: -1 })
                    .then(users => res.json(users))
            } else {
                return res.status(400).json({ msg: 'No permission' });
            }
        });
});

// @route   DELETE api/users
// @desc    Delete User
// @access  Private
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.deleteOne().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/users/edit
// @desc    Edit A User
// @access  Private----------------------------------------------
router.post('/edit/:id', auth, (req, res) => {
    //console.log(req.body.password);
    // console.log(req.params.id)

    const { name, pet, breed, cellphone, petImage, email } = req.body;
    // console.log('enter' )
    // console.log(req.body )

    //Simple validation
    if (!name || !pet || !breed || !cellphone || !petImage || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // console.log(petImage)
    // try {
    //     if (!fs.existsSync(petImage)) {
    //         petImage='/uploads/users/no-image.png';
    //     }
    // } catch (err) {
    //     console.error(err)
    // }

    Pet.findOne({ name: pet }).then(pet => {
        Breed.findOne({ name: breed }).then(breed => {

            var newUser = {
                name,
                pet,
                breed,
                cellphone,
                petImage,
                email
            };
            // console.log(newUser)
            User.findById(req.params.id).then(user =>
                user.updateOne(newUser).then(() => {
                    User.findById(req.params.id).populate('pet').populate('breed')
                        .then(user => {
                            // console.log(user )

                            res.json(user)
                        })
                }))
                .catch(err => res.status(404).json({ success: false }));
        })
    })

    // if(req.body.password !== '') {
    //     newUser.password=req.body.password
    //     console.log("_____________");
    // }

});


// @route   GET api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {

    const { name, pet, breed, email, cellphone, petImage, password } = req.body;
    //Simple validation
    if (!name || !email || !password || !cellphone || !pet || !breed) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            Pet.findOne({ "name": pet }).then(pet => {
                Breed.findOne({ "name": breed }).then(breed => {
                    const newUser = new User({
                        name,
                        pet,
                        breed,
                        cellphone,
                        email,
                        password
                    });

                    if (petImage != '')
                        newUser.petImage = petImage;

                    // Create salt & hash
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()

                                .then(user => {
                                    User.findOne(user)
                                        .then(user => {

                                            jwt.sign(
                                                { id: user.id },
                                                config.get('jwtSecret'),
                                                { expiresIn: 3600 },
                                                (err, token) => {
                                                    if (err) throw err;
                                                    res.json({
                                                        token,
                                                        user: {
                                                            _id: user.id,
                                                            name: user.name,
                                                            admin: user.admin,
                                                            email: user.email,
                                                            cellphone: user.cellphone,
                                                            petImage: user.petImage,
                                                            pet: pet,
                                                            breed: breed
                                                        }
                                                    });
                                                }
                                            )
                                        });
                                });
                        })
                    })
                })
            })
        })
});

module.exports = router;