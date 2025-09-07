const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    category: "Electronics",
    brand: "TechSound",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
    ],
    stock: 50,
    featured: true,
    onSale: true,
    salePrice: 149.99
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance. Track your workouts and health metrics.",
    price: 299.99,
    category: "Electronics",
    brand: "FitTech",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500"
    ],
    stock: 30,
    featured: true
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.",
    price: 29.99,
    category: "Clothing",
    brand: "EcoWear",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    stock: 100,
    onSale: true,
    salePrice: 19.99
  },
  {
    name: "Programming Fundamentals Book",
    description: "Comprehensive guide to programming fundamentals. Perfect for beginners and intermediate developers.",
    price: 49.99,
    category: "Books",
    brand: "TechBooks",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
    ],
    stock: 75,
    featured: true
  },
  {
    name: "Indoor Plant Set",
    description: "Beautiful set of 3 indoor plants perfect for home decoration. Includes care instructions.",
    price: 79.99,
    category: "Home & Garden",
    brand: "GreenLife",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500"
    ],
    stock: 25
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with excellent grip and cushioning. Perfect for all types of yoga practice.",
    price: 59.99,
    category: "Sports",
    brand: "FlexFit",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      "https://images.unsplash.com/photo-1506629905607-0b2b1a0b0b0b?w=500"
    ],
    stock: 40
  },
  {
    name: "Skincare Set",
    description: "Complete skincare routine set with cleanser, moisturizer, and serum. Natural ingredients.",
    price: 89.99,
    category: "Beauty",
    brand: "PureSkin",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500"
    ],
    stock: 60,
    onSale: true,
    salePrice: 69.99
  },
  {
    name: "Educational Building Blocks",
    description: "Colorful building blocks set for children. Develops creativity and motor skills.",
    price: 39.99,
    category: "Toys",
    brand: "LearnPlay",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500"
    ],
    stock: 80
  },
  {
    name: "Gaming Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with customizable keys. Perfect for gaming and typing.",
    price: 129.99,
    category: "Electronics",
    brand: "GameTech",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    ],
    stock: 35,
    featured: true
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with modern fit. Made from sustainable materials.",
    price: 89.99,
    category: "Clothing",
    brand: "StyleCo",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500"
    ],
    stock: 45
  }
];

const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} users`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();