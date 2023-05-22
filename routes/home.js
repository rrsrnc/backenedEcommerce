const express = require('express');
const router =express.Router();
const categoriesAndProduct =require('../models/categoriesAndProduct')

//route 1 to get all products 
router.get('/products',[], async(req, res) => {
    const c=await categoriesAndProduct.find()
    .then((home) => {
      res.json(home[0].products);
    })
    .catch((error) => {
      console.error('Error retrieving carts:', error);
      res.status(500).json({ error: 'Server error' });
    });
      
    })
//route 2 to get all categories 
router.get('/categories',[], async(req, res) => {
    categoriesAndProduct.find()
    .then((home) => {
      res.json(home[0].categories);
    })
    .catch((error) => {
      console.error('Error retrieving carts:', error);
      res.status(500).json({ error: 'Server error' });
    });
      
    })

module.exports = router;