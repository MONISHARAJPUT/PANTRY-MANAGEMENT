const mongoose = require('mongoose');

const itemPhotoSchema = new mongoose.Schema(
    {
        // Other fields for item data
        itemName: {
            type: String,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
    },
    {
        versionKey: false,
    }
);

const ItemPhoto = mongoose.model('ItemPhoto', itemPhotoSchema);
module.exports = ItemPhoto;
