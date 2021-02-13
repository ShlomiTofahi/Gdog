const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true,
        unique: true
    },  
    petImage: {
        type: String,
        required: true,
        default: '/uploads/users/no-image.png'
    },
    pet: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pet'
    },
    breed: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Breed'
    },
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
     }],
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
     }],
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User',UserSchema);