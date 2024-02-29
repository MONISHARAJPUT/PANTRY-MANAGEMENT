const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        unique: true,
    },
    itemCategory: {
        type: String,
        required: true,
    },
    itemImage: {
        type: String,
        // required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    // expiration: {
    //     type: String,
    //     required: true,
    // },
});

const Item = mongoose.model('ItemSchema', ItemSchema);

module.exports = Item;
