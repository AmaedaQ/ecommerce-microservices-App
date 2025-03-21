const express = require("express");
const Order = require("../models/Order");
const Product = require(".././../product-service/models/Product"); // Import Product model to fetch product details
const router = express.Router();

// ✅ Create Order
router.post("/", async (req, res) => {
  try {
    const { products } = req.body;

    // Fetch product details (name and price) based on productId
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const productData = await Product.findById(product.productId);

        if (!productData) {
          return res.status(404).json({ message: "Product not found" });
        }

        const totalProductPrice = productData.price * product.quantity;

        return {
          productId: product.productId,
          productName: productData.name,
          quantity: product.quantity,
          price: productData.price,
          totalProductPrice,
        };
      })
    );

    // Calculate the total price for the order
    const totalPrice = updatedProducts.reduce((total, product) => {
      return total + product.totalProductPrice;
    }, 0);

    // Create a new Order using the schema
    const newOrder = new Order({
      products: updatedProducts,
      totalPrice,
      status: "Pending", // Default status is "Pending"
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with the newly created order
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// ✅ Get All Orders (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "products.productId",
      "name price"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// ✅ Get Order by ID (User)
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId",
      "name price"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

// ✅ Update Order Status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
});

module.exports = router;
