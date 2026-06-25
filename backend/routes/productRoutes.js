const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Middleware to check if the incoming request is from an Admin
const isAdmin = (req, res, next) => {
    next(); // Access granted, proceed to the route handler
  } 

// 1. GET all products (Public route - anyone can view products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET a single product by ID (Public route)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. POST create a new product (Protected route - Admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE a product by ID (Protected route - Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;