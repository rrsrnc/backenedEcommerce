const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser');

// Route 1: Get all products in the cart
router.get('/products', fetchuser, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            res.send(cart);
        } else {
            res.status(501).send("No products in the cart");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a product to the cart
router.post('/addproduct', fetchuser, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        const { name, price, quantity, pId } = req.body;

        if (cart) {
            cart.products.push({ name, price, quantity, pId });
            await cart.save();
            res.send(cart);
        } else {
            cart = new Cart({
                user: req.user.id,
                products: [{ name, price, quantity, pId }]
            });
            await cart.save();
            res.send(cart);
        }
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route 3: Increase the quantity of a product in the cart
router.put('/updateproductincrease/:id', fetchuser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const product = cart.products.find((p) => p.pId === req.params.id);

        if (product) {
            product.quantity += 1;
            await cart.save();
            res.send(product);
        } else {
            res.status(501).send("Product not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Decrease the quantity of a product in the cart
router.put('/updateproductdecrease/:id', fetchuser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const product = cart.products.find((p) => p.pId === req.params.id);

        if (product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
                await cart.save();
                res.send(product);
            } else {
                res.status(501).send("Product quantity cannot be less than 1");
            }
        } else {
            res.status(501).send("Product not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 5: Delete a product from the cart
router.delete('/deleteproduct/:id', fetchuser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const updatedProducts = cart.products.filter((p) => p.pId != req.params.id);

        if (updatedProducts.length !== cart.products.length) {
            cart.products = updatedProducts;
            await cart.save();
            res.send({ prod: updatedProducts });
        } else {
            res.status(501).send("Product not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 6: Clear the cart
router.delete('/clearcart', fetchuser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            await cart.delete();
            res.sendStatus(200);
        } else {
            res.status(501).send("Cart is already empty");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
