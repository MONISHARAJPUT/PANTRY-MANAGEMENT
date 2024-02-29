const express = require('express');

const router = express.Router();
// const validateToken = require('../middleware/validateTokenHandler');
const { createItem, getItem, updateItem, deleteItem, getItems, getCategory, getbyitemName } = require('../lib/handler/itemController');

// router.use(validateToken);

router.route('/').get(getItems); // get all items

router.route('/create').post(createItem); // create a new item

router.route('/id/:id').get(getItem); // get item by id

router.route('/update/:id').put(updateItem); // update item by id

router.route('/delete/:id').delete(deleteItem); // delete item by id

router.route('/:category').get(getCategory); // get items based on category

router.route('/find/:itemName').get(getbyitemName); //  get item by name

module.exports = router;
