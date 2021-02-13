const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


//Pet Model
const Pet = require('../../models/Pet');
//Breed Model
const Breed = require('../../models/Breed');
//User Model
const User = require('../../models/User');

// @route   GET api/pets
// @desc    Get All Pets
// @access  Public
router.get('/', (req,res) => {
    Pet.find().populate('breeds')
    .then(pets => res.json(pets))
});

// @route   POST api/pets/breeds
// @desc    get breeds of the pet
// @access  Public
router.get('/:id', (req,res) => {
   //get specific pet
   Pet.findById( req.params.id ).populate('breeds').then(pet => {
    if(!pet) return res.status(400).json({ msg: 'Pet Does not exist' });
    res.json(pet);
    })
});

// @route   POST api/pets
// @desc    Create A Pets
// @access  Private
router.post('/', auth, (req,res) => {
    var newBreed = null;
    Pet.findOne({ name:"Other" }).then(pet =>{
        if (!pet) {
            const newPet= new Pet({ name:"Other" });
            newBreed= new Breed({ name:"Other" });
            newPet.save().then(pet => {
                Pet.findOne(pet).then(pet => {
                    newBreed.pet = pet;
                    newBreed.save().then((breed) =>{
                        newPet.breeds = breed;
                        newPet.save()
                    })
                })
            })
        }
    })

    const { name } = req.body;
    
    //Simple validation
    if(!name){
        return res.status(400).json({ msg:'Please enter all fields' });
    }
   //check for existing pets
   Pet.findOne({ name })
   .then(pet => {
       if(pet) return res.status(400).json({ msg: 'Pet already exists' });
        User.findById(req.user.id)
        .select('-password')
        .then(user =>{
            if(user.admin) {
                Breed.findOne({name:"Other"}).then((breed => {
                    if (!breed){
                        breed = newBreed;
                    }
                    
                   // return res.json(breed)
                    const newPet= new Pet({ name });
                newPet.breeds = breed;
                newPet.save().then(pet => {
                    Pet.findOne(pet)
                    .then(pet => {
                            newPet.save().then((pet) =>{ 
                                Pet.findOne(pet).then( pet =>  res.json(pet))
                            })
                        })
                    });
                }))

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
    Pet.findById(req.params.id)
    .then(pet => {
        User.findById(req.user.id)
        .select('-password')
        .then(user =>{
            if(user.admin) {
                Breed.deleteMany({pet:req.params.id}).then( () => {
                pet.deleteOne().then(() => res.json({success: true}))
                })
            } else {
                return res.status(400).json({ msg:'No permission' });
            }
        })
    })
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;