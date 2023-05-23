const express = require('express');
const router = express.Router();
const categoriesAndProduct = require('../models/categoriesAndProduct');

// Route 1: Get all products
router.get('/products', [], async (req, res) => {
    try {
        const home = await categoriesAndProduct.find();
        res.json(home[0].products);
    } catch (error) {
        console.error('Error retrieving products', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route 2: Get all categories
router.get('/categories', [], async (req, res) => {
    try {
        const home = await categoriesAndProduct.find();
        res.json(home[0].categories);
    } catch (error) {
        console.error('Error retrieving categories', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route 3: Get products by category
router.get('/products/:id', [], async (req, res) => {
    try {
        const home = await categoriesAndProduct.find();
        const productByCategory = home[0].products.filter((p) => p.categoryId.toString() === req.params.id);
        res.json(productByCategory);
    } catch (error) {
        console.error('Error retrieving products by category', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
