const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    breed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Breed'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    postImage: {
        type: String,
        default: ''
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    published_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('Post', PostSchema);