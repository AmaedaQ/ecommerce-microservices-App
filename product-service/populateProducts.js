const mongoose = require("mongoose");
const Product = require("./models/Product"); // Update with the correct path to your model

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/commerce_microservices_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Sample product data
const products = [
  {
    name: "Laptop",
    price: 999,
    stock: 50,
    description: "High-performance laptop",
    category: "Electronics",
  },
  {
    name: "Smartphone",
    price: 699,
    stock: 150,
    description: "Latest model smartphone",
    category: "Electronics",
  },
  {
    name: "Wireless Mouse",
    price: 29,
    stock: 200,
    description: "Ergonomic wireless mouse",
    category: "Accessories",
  },
  {
    name: "Keyboard",
    price: 49,
    stock: 120,
    description: "Mechanical keyboard",
    category: "Accessories",
  },
  {
    name: "Gaming Chair",
    price: 299,
    stock: 30,
    description: "Ergonomic gaming chair",
    category: "Furniture",
  },
  {
    name: "Coffee Table",
    price: 159,
    stock: 40,
    description: "Wooden coffee table",
    category: "Furniture",
  },
  {
    name: "Winter Jacket",
    price: 89,
    stock: 80,
    description: "Warm winter jacket",
    category: "Clothing",
  },
  {
    name: "Sneakers",
    price: 69,
    stock: 100,
    description: "Comfortable sneakers",
    category: "Footwear",
  },
  {
    name: "Sunglasses",
    price: 25,
    stock: 300,
    description: "Stylish sunglasses",
    category: "Accessories",
  },
  {
    name: "Washing Machine",
    price: 499,
    stock: 60,
    description: "Top-load washing machine",
    category: "Home Appliances",
  },
  {
    name: "Refrigerator",
    price: 799,
    stock: 50,
    description: "Double-door refrigerator",
    category: "Home Appliances",
  },
  {
    name: "Microwave",
    price: 99,
    stock: 150,
    description: "Compact microwave",
    category: "Home Appliances",
  },
  {
    name: "Blender",
    price: 49,
    stock: 250,
    description: "Powerful kitchen blender",
    category: "Home Appliances",
  },
  {
    name: "Camera",
    price: 349,
    stock: 75,
    description: "Digital camera",
    category: "Electronics",
  },
  {
    name: "Headphones",
    price: 129,
    stock: 120,
    description: "Noise-canceling headphones",
    category: "Accessories",
  },
  {
    name: "Backpack",
    price: 39,
    stock: 180,
    description: "Stylish and durable backpack",
    category: "Accessories",
  },
  {
    name: "Smartwatch",
    price: 199,
    stock: 140,
    description: "Fitness tracking smartwatch",
    category: "Electronics",
  },
  {
    name: "T-shirt",
    price: 19,
    stock: 200,
    description: "Comfortable cotton t-shirt",
    category: "Clothing",
  },
  {
    name: "Jeans",
    price: 39,
    stock: 180,
    description: "Classic denim jeans",
    category: "Clothing",
  },
  {
    name: "Shoes",
    price: 49,
    stock: 150,
    description: "Casual shoes for everyday use",
    category: "Footwear",
  },
];

// Function to insert products
const insertProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products added successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding products:", error);
  }
};

// Run the insert function
insertProducts();
