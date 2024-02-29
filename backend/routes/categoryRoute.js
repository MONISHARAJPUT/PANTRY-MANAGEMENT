const express = require('express');

const router = express.Router();
const Category = require('../models/categorySchema');

//  create category
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

//  Delete category based on id
router.delete('/delete/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    await category.deleteOne({ _id: req.params.id });
    res.status(200).json({ 'Category deleted': category.name });
    // console.log(`Category deleted successfully: ${JSON.stringify(category)}`);
});

module.exports = router;
