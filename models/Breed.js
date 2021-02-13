const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BreedSchema =  new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet"
     }
});

module.exports = Breed = mongoose.model('Breed',BreedSchema);