const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AgeSchema =  new Schema({
    level: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = age = mongoose.model('Age',AgeSchema);