require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging Line

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Service is Running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
