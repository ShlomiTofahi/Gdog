const express = require('express');
const router = express.Router();

//Age Model
const Age = require('../../models/Age');

// @route   GET api/breeds
// @desc    Get All Breeds
// @access  Public
router.get('/', (req,res) => {
    Age.find()
    .then(ages => res.json(ages))
});

module.exports = router;