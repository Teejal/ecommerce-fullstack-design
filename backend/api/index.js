const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoute = require('./routes/authroute');

const app = express();

// 1. MIDDLEWARES 
app.use(cors({ origin: '*' }));
app.use(express.json()); 

// 2. ROUTES 
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoute);

// Test Routes
app.get('/test', (req, res) => res.json({ ok: true }));
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('Error:', err));

module.exports = app;