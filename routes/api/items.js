const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');
//Pet Model
const Pet = require('../../models/Pet');
//Breed Model
const Breed = require('../../models/Breed');
//Category Model
const Category = require('../../models/Category');
//Age Model
const Age = require('../../models/Age');
//Rating Model
const Rating = require('../../models/Rating');

const { compareSync } = require('bcryptjs');


// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find().populate('category').populate('pet').populate('breed').populate('age').populate('rating')
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   GET api/items/minmaxprice
// @desc    Get min & max price
// @access  Public
router.get('/minmaxprice', (req, res) => {
    Item.find()
        .select("price")
        .sort({ "price": 1 })
        .limit(1)
        .then(minitemPrice => {
            if(!minitemPrice.length)
                return res.status(400).json({ msg: 'no items' });
            Item.find()
                .select("price")
                .sort({ "price": -1 })
                .limit(1)
                .then(maxitemPrice => {
                    res.json({ "min": minitemPrice[0].price, "max": maxitemPrice[0].price });
                })
        })
});

// @route   GET api/items
// @desc    Get a Item by id
// @access  Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id).populate('category').populate('pet').populate('breed').populate('age').populate('rating')
        .then(item => res.json(item))
});

// @route   GET api/items/filter
// @desc    Get specific Item
// @access  Public
router.post('/filter', (req, res) => {
    const { name, price, pet, breed, category, age, rating } = req.body;

    //Simple validation
    if (name == null || price == null || age == null || pet == null || breed == null || category == null || rating == null)
        return res.status(400).json({ msg: 'One or more field is missing' });

    Pet.find({ name: { $in: pet } }).then(pet => {
        Breed.find({ name: { $in: breed } }).then(breed => {
            Category.find({ name: { $in: category } }).then(category => {

                Age.find({ level: { $in: age } }).then(age => {
                    Rating.find({ overall: { $gte: rating, $lt: rating + 1 } }).then(rating => {
                        if ((!name || name == "") && (!price || price == "") && (!rating || rating == "")
                            && !pet.length && !breed.length && !category.length && !age.length) {
                            Item.find().populate('category').populate('pet').populate('breed').populate('age').populate('rating')
                                .sort({ date: -1 })
                                .then(items => res.json(items))
                        } else {
                            var item = [];
                            var itemIdList = [];

                            Item.find({ name: { $regex: name, $options: 'i' } }).select("_id").then(newItem => {
                                if (name != "") {
                                    if (!newItem.length) {
                                        return res.json([])
                                    }
                                    else {
                                        itemIdList = []
                                        newItem.map(item => itemIdList.push(String(item._id)))
                                        if (!item.length) item = newItem;
                                        if (newItem.length) item = item.filter(element => itemIdList.includes(String(element._id)));
                                    }
                                }

                                Item.find({ price: { $lte: price } }).select("_id").then(newItem => {
                                    if (price != "") {
                                        itemIdList = []
                                        if (!newItem.length) {
                                            return res.json([])
                                        }
                                        else {
                                            newItem.map(item => itemIdList.push(String(item._id)))
                                            if (!item.length) item = newItem;
                                            if (newItem.length) item = item.filter(element => itemIdList.includes(String(element._id)));
                                        }
                                    }

                                    Item.find({ age: { $in: age } }).select("_id").then(newItem => {
                                        if (age.length) {
                                            itemIdList = []
                                            if (!newItem.length) {
                                                return res.json([])
                                            } else {
                                                newItem.map(item => itemIdList.push(String(item._id)))
                                                if (!item.length) item = newItem;
                                                if (newItem.length) item = item.filter(element => itemIdList.includes(String(element._id)));
                                            }
                                        }

                                        Item.find({ category: { $in: category } }).select("_id").then(newItem => {
                                            if (category.length) {
                                                itemIdList = []
                                                if (!newItem.length) {
                                                    return res.json([])
                                                } else {
                                                    newItem.map(item => itemIdList.push(String(item._id)))
                                                    if (!item.length) item = newItem;
                                                    if (newItem.length) { item = item.filter(element => itemIdList.includes(String(element._id))); }
                                                }
                                            }

                                            Item.find({ pet: { $in: pet } }).select("_id").then(newItem => {
                                                if (pet.length) {
                                                    itemIdList = []
                                                    if (!newItem.length) {
                                                        return res.json([])
                                                    } else {
                                                        newItem.map(item => itemIdList.push(String(item._id)))
                                                        if (!item.length) item = newItem;
                                                        if (newItem.length) item = item.filter(element => itemIdList.includes(String(element._id)));
                                                    }
                                                }

                                                Item.find({ breed: { $in: breed } }).select("_id").then(newItem => {
                                                    if (breed.length) {
                                                        itemIdList = []
                                                        if (!newItem.length) {
                                                            return res.json([])
                                                        } else {
                                                            newItem.map(item => itemIdList.push(String(item._id)))
                                                            if (!item.length) item = newItem;
                                                            if (newItem.length) item = item.filter(element => itemIdList.includes(String(element._id)));
                                                        }
                                                    }

                                                    Item.find({ rating: { $in: rating } }).select("_id").then(newItem => {
                                                        if (rating != "") {
                                                            itemIdList = []
                                                            if (!newItem.length) {
                                                                return res.json([])
                                                            }
                                                            else {
                                                                newItem.map(item => itemIdList.push(String(item._id)))
                                                                if (!item.length) item = newItem;
                                                                if (newItem.length) item = item.filter(element => itemIdList.includes(String(element._id)));
                                                            }
                                                        }

                                                        Item.find({ "_id": { $in: item } }).populate('pet').populate('breed').populate('category').populate('age').populate('rating')
                                                            .sort({ date: -1 })
                                                            .then(items => res.json(items))
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    })
                })
            })
        })
    })
});

// @route   POST api/items
// @desc    Create A Item
// @access  Private
router.post('/', auth, (req, res) => {
    User.findById(req.user.id).then(user => {
        if (!user.admin) {
            return res.status(400).json({ msg: 'No permission' });
        }


        const { name, age, pet, breed, category, price, discount, description, itemImage, weight } = req.body;

        //Simple validation
        if (!name || !age || !pet || !breed || !category || !price || !description) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        Pet.findOne({ name: pet }).then(pet => {
            Breed.findOne({ name: breed }).then(breed => {
                Category.findOne({ name: category }).then(category => {
                    Age.findOne({ level: age }).then(age => {
                        const newRating = new Rating();
                        newRating.save().then(rating => {
                            const newItem = new Item({
                                name,
                                price,
                                discount,
                                description,
                                pet,
                                breed,
                                category,
                                age,
                                weight,
                                rating
                            });

                            if (itemImage != '')
                                newItem.itemImage = itemImage;

                            newItem.save().then(item => {
                                Item.findOne(item).populate('pet').populate('breed').populate('category').populate('rating')
                                    .then(item => {
                                        res.json(item)
                                    });
                            });
                        })


                    })
                })
            })
        })
    })

});

// @route   POST api/items/edit
// @desc    Edit A Item
// @access  Private
router.post('/edit/:id', auth, (req, res) => {

    User.findById(req.user.id).then(user => {
        if (!user.admin) {
            return res.status(400).json({ msg: 'No permission' });
        }

        const { name, age, pet, breed, category, price, discount, description, itemImage, weight } = req.body;

        //Simple validation
        if (!name || !age || !pet || !breed || !category || !price || !description || !category) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        Age.findOne({ level: age }).then(age => {
            Pet.findOne({ name: pet }).then(pet => {
                Breed.findOne({ name: breed }).then(breed => {
                    Category.findOne({ name: category }).then(category => {

                        var newItem = {
                            name,
                            price,
                            discount,
                            description,
                            pet,
                            age,
                            breed,
                            category,
                            itemImage,
                            weight,
                        };

                        Item.findById(req.params.id).then(item =>
                            item.updateOne(newItem).then(() => {
                                Item.findById(req.params.id).populate('category').populate('pet').populate('breed').populate('age').populate('rating')
                                    .then(item => res.json(item))
                            })
                        ).catch(err => res.status(404).json({ success: false }));
                    })
                })
            })
        })
    })
});

// @route   POST api/items/rating
// @desc    Ranking A Item
// @access  Private
router.post('/rating/:id', auth, (req, res) => {

    const { rating } = req.body;

    //Simple validation
    if (!rating) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    Item.findById(req.params.id).then(item => {
        Rating.findById(item.rating).then(curr_rating => {
            curr_rating.overall = ((curr_rating.overall * curr_rating.total) + rating) / (curr_rating.total + 1);
            curr_rating.total = curr_rating.total + 1;
            curr_rating.save().then((rating) => {
                item.rating = rating;
                item.save().then((item) => res.json({ success: true }));
            })
        })
    })
        .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/items/views
// @desc    views A Item
// @access  Private
router.post('/views/:id', auth, (req, res) => {
    Item.findById(req.params.id).then(item => {
        item.views = item.views + 1;
        item.save().then(() => res.json({ success: true }));
    })
        .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/items
// @desc    Delete Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            Rating.findById(item.rating).then(rating => {
                rating.deleteOne().then(() => {
                    item.deleteOne().then(() => res.json({ success: true }))
                })
            })
        })
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;