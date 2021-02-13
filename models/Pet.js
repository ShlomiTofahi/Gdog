const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PetSchema =  new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    breeds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Breed"
     }]
});

module.exports = Pet = mongoose.model('Pet',PetSchema);