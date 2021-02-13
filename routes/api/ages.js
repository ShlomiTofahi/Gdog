const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Age Model
const Age = require('../../models/Age');
//Breed Model
const Breed = require('../../models/Breed');
//Pet Model
const Pet = require('../../models/Pet');
//User Model
const User = require('../../models/User');

// @route   GET api/breeds
// @desc    Get All Breeds
// @access  Public
router.get('/', (req,res) => {
    Age.find()
    .then(ages => res.json(ages))
});
/*
// @route   POST api/breeds
// @desc    Create A breeds
// @access  Private
router.post('/', auth, (req,res) => {
    const { name, pet } = req.body;
    
    //Simple validation
    if(!name || !pet){
        return res.status(400).json({ msg:'Please enter all fields' });
    }
   //check for existing breed
   Breed.findOne({ name })
   .then(breed => {
       if(breed) return res.status(400).json({ msg: 'Breed already exists' });
        User.findById(req.user.id)
        .select('-password')
        .then(user =>{
            if(user.admin) {
                Pet.findOne({name:pet}).then( pet => {
                    const newBreed= new Breed({ name, pet });
                    newBreed.save().then(breed => {
                        Breed.findOne(breed).then(breed => {
                            Breed.find({pet:pet}).populate('post').populate('user').then( breeds => { 
                                pet.breeds = breeds;
                                pet.save().then(() =>{
                                    res.json(breed)

                                })
                            })
                        });
                    });     
                })
            } else {
                return res.status(400).json({ msg:'No permission' });
            }
        })
    })
});

// @route   DELETE api/pets
// @desc    Delete Pet
// @access  Private
router.delete('/:id', auth, (req,res) => {
    Breed.findById(req.params.id).populate('pet')
    .then(breed => {
        User.findById(req.user.id)
        .select('-password')
        .then(user =>{
            if(user.admin) {
                Pet.findOne({name:breed.pet.name}).then(pet => { 
                    Breed.find({pet}).then( breeds => {
                        pet.breeds = breeds.filter(breed => breed._id != req.params.id);
                        pet.save().then(() => { 
                            breed.deleteOne().then(() => res.json({success: true}))
                        })
                    })
                })
            } else {
                return res.status(400).json({ msg:'No permission' });
            }
        })
    })
    .catch(err => res.status(404).json({success: false}));
});
*/
module.exports = router;