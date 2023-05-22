const express = require('express');
const router =express.Router();
const Cart = require('../models/Cart');
const fetchuser = require('../middleware/fetchuser');


//route 1 to get all products 
router.get('/products',fetchuser, async(req, res) => {
  let product=await Cart.findOne({user:req.user.id})

    if(product){
        res.send(product)
    }
    else{
        res.status(501).send("No products")
    }
    
  })
  //Route 2 to add product to cart
router.post('/addproduct',fetchuser, async(req, res) => {
  let cart=await Cart.findOne({user:req.user.id})
  const { name, price, quantity } = req.body;
  if(cart){
    cart.products.push({ name, price, quantity })
    await cart.save();
      res.send(cart);
  }
  else{
    try {
      
      cart = new Cart({
        user: req.user.id,
        products: []
      });
      cart.products.push({name,price,quantity})
  
      await cart.save();
      res.send(cart);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  
});

  //route 3 to Increase the cart product quantity
  router.put('/updateproductincrease/:id',fetchuser, async(req, res) => {
    let cart=await Cart.findOne({user:req.user.id})
    console.log(cart,req.user.id)
    const product = cart.products.find((p) => p._id.toString() === req.params.id);

    if(product){
      product.quantity+=1
      cart.save()
      res.send(product)

    }
    else{
        res.status(501).send("Product not found")
      }
    }
    )
  //route 4 to update the cart product quantity
  router.put('/updateproductdecrease/:id',fetchuser, async(req, res) => {
    const cart=await Cart.findOne({user:req.user.id})
    const product = cart.products.find((p) => p._id.toString() === req.params.id);
    if(product){
      product.quantity-=1
      cart.save()
      res.send(product)

    }
    else{
        res.status(501).send("Product not found")
      }
    }
    )
  //route 4 to delete the cart product 
  router.delete('/deleteproduct/:id',fetchuser, async(req, res) => {
    let cart=await Cart.findOne({user:req.user.id})
    const product = cart.products.filter((p) => p._id.toString() != req.params.id);
    if(product){
      cart.products=[...product]
      cart.save()
      res.send({prod:[...product]})

    }
    else{
        res.status(501).send("Invalid credentials")
      }
    }
    )
  //route 5 to clear the cart
  router.delete('/clearcart',fetchuser, async(req, res) => {
    let cart=await Cart.findOne({user:req.user.id})
    if(cart){
     
      cart.delete()
      res.send(200)

    }
    else{
        res.status(501).send("Cart empty")
      }
    }
    )

module.exports = router;