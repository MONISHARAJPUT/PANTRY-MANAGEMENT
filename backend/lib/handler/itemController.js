const asyncHandler = require('express-async-handler');
// const ItemPhoto = require('../../models/itemPhoto');
const itemSchema = require('../../models/itemSchema');

// get all items
const getItems = asyncHandler(async (req, res) => {
    const item = await itemSchema.find({}).sort({ itemQuantity: 1 });
    res.status(200).json(item);
});

// Create Item
const createItem = asyncHandler(async (req, res) => {
    // console.log('The request body is: ', req.body);
    const { itemName, itemCategory,  itemQuantity } = req.body;
    if (!itemName || !itemCategory || !itemQuantity) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const item = await itemSchema.create({
        itemName,
        itemCategory,
        //itemImage,
        itemQuantity,
        // expiration,
    });
    res.status(201).json(item);
});

// Get item using id
const getItem = asyncHandler(async (req, res) => {
    const item = await itemSchema.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    res.status(200).json(item);
});

// Update an item using Id
const updateItem = asyncHandler(async (req, res) => {
    const item = await itemSchema.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    const updatedItem = await itemSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
});

// delete an item using id
const deleteItem = asyncHandler(async (req, res) => {
    const item = await itemSchema.findById(req.params.id);
    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }
    await item.deleteOne({ _id: req.params.id });
    res.status(200).json({ 'Item deleted': item.itemName });
    console.log(`Item deleted successfully: ${JSON.stringify(item)}`);
});

// // Adding photo
// router.post('/:itemName/', upload.single('photo'), async (req, res) => {
//     try {
//         // logger.log('Uploading Photo');
//         const { itemName } = req.params;
//         const photoData = req.file.buffer;
//         const contentType = req.file.mimetype;

//         const newItemPhoto = new ItemPhoto({
//             itemName,
//             photo: {
//                 data: photoData,
//                 contentType,
//             },
//         });

//         await newItemPhoto.save();

//         res.status(200).json({ message: 'Photo uploaded successfully.' });
//     } catch (error) {
//         logger.error(error);
//         res.status(500).json({ error: 'Failed to upload photo.' });
//     }
// });

// const deleteItem = asyncHandler(async (req, res) => {
//     try {
//       const item = await category.findByIdAndDelete(request.params.id);
//       if (!item) response.status(404).send("No Item found with that id");
//       response.status(200).send();
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

//  Get all Categories

const getCategory = asyncHandler(async (req, res) => {
    const categories = await itemSchema.find({ itemCategory: req.params.category });
    try {
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

//  Get Item by name
const getbyitemName = asyncHandler(async (req, res) => {
    const { itemName } = req.params;
    const item = await itemSchema.find({ itemName: { $regex: new RegExp(itemName, 'i') } });

    try {
        res.send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = { createItem, getItem, updateItem, deleteItem, getItems, getCategory, getbyitemName };

// Adding photo
// router.post('/voter/:voterid/photo', upload.single('photo'), async (req, res) => {
//     try {
//         // logger.log('Uploading Photo');
//         const { voterid } = req.params;
//         const photoData = req.file.buffer;
//         const contentType = req.file.mimetype;

//         const newVoterPhoto = new VoterPhoto({
//             voterid,
//             photo: {
//                 data: photoData,
//                 contentType,
//             },
//         });

//         await newVoterPhoto.save();

//         res.status(200).json({ message: 'Photo uploaded successfully.' });
//     } catch (error) {
//         logger.error(error);
//         res.status(500).json({ error: 'Failed to upload photo.' });
//     }
// });

// // Retreving voters photo
// router.get('/voter/:voterId/photo', async (req, res) => {
//     try {
//         const { voterId } = req.params;
//         const voterPhoto = await VoterPhoto.findOne({ voterid: voterId });
//         // logger.info(voterPhoto);
//         res.set('Content-Type', voterPhoto.photo.contentType);
//         res.send(voterPhoto.photo.data);
//     } catch (error) {
//         logger.error(error);
//         res.status(500).json({ error: 'Failed to retrieve voter photo.' });
//     }
// });
