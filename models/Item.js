const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');

// Create Schema
const ItemSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    itemImage: {
        type: String,
        default: '/uploads/items/no-image.png'
    },
    discount: {
        type: Number,
    },
    description: {
        type: String,
        required: true 
    },
    weight: {
        type: Number
    },
    views: {
        type: Number,
        required: true, 
        default: 0
    },
    rating: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rating'
    },
    pet: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pet'
    },
    breed: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Breed'
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    age: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Age'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('Item',ItemSchema);