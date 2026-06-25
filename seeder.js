const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  { name: "Leather Jacket", price: 78, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300", description: "Premium leather jacket", category: "Jackets", stock: 10 },
  { name: "Denim Shirt", price: 16, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300", description: "Classic slim fit denim shirt", category: "Shirts", stock: 25 },
  { name: "Oversized Hoodie", price: 19, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300", description: "Heavy fleece unisex hoodie", category: "Hoodies", stock: 30 },
  { name: "Winter Coat", price: 29, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300", description: "Warm winter coat", category: "Jackets", stock: 15 },
  { name: "Denim Jeans", price: 19, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300", description: "Classic blue denim jeans", category: "Pants", stock: 20 },
  { name: "Cotton T-Shirt", price: 10, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300", description: "T-shirts with multiple colors", category: "T-Shirts", stock: 50 },
  { name: "Slim Fit Denim Pants", price: 24, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300", description: "Slim fit stretch denim pants", category: "Pants", stock: 18 },
  { name: "Casual Blazer", price: 45, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300", description: "Smart casual blazer", category: "Blazers", stock: 12 },
  { name: "Polo Shirt", price: 12, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300", description: "Classic polo shirt", category: "Shirts", stock: 35 },
  { name: "Windbreaker", price: 35, image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=300", description: "Lightweight windbreaker jacket", category: "Jackets", stock: 20 },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Clothing products added!');
    process.exit();
  });