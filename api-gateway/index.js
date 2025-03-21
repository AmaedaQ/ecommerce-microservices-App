// // require("dotenv").config();
// // const express = require("express");
// // const axios = require("axios");
// // const cors = require("cors");
// // const session = require("express-session");

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middleware
// // app.use(express.json());
// // app.use(cors());

// // // Session Middleware for Simple Authentication
// // app.use(
// //   session({
// //     secret: "your_secret_key",
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { secure: false }, // Set to true in production with HTTPS
// //   })
// // );

// // // Microservices URLs (Update if running on different ports)
// // const SERVICES = {
// //   product: "http://localhost:5001",
// //   user: "http://localhost:5002",
// //   order: "http://localhost:5003",
// //   payment: "http://localhost:5004",
// // };

// // // 🔹 Helper Function to Forward Requests to Microservices
// // const forwardRequest = async (req, res, serviceUrl) => {
// //   try {
// //     const response = await axios({
// //       method: req.method,
// //       url: `${serviceUrl}${req.originalUrl}`,
// //       data: req.body,
// //       headers: req.headers,
// //     });
// //     res.status(response.status).json(response.data);
// //   } catch (error) {
// //     res
// //       .status(error.response?.status || 500)
// //       .json({ message: "Error forwarding request", error: error.message });
// //   }
// // };

// // // 🔹 Routes for Each Microservice
// // app.use("/products", (req, res) => forwardRequest(req, res, SERVICES.product));
// // app.use("/users", (req, res) => forwardRequest(req, res, SERVICES.user));
// // app.use("/orders", (req, res) => forwardRequest(req, res, SERVICES.order));
// // app.use("/payments", (req, res) => forwardRequest(req, res, SERVICES.payment));

// // // 🔹 Simple Session-Based Authentication Middleware
// // const authMiddleware = (req, res, next) => {
// //   if (!req.session.user) {
// //     return res.status(401).json({ message: "Unauthorized. Please log in." });
// //   }
// //   next();
// // };

// // // 🔹 Login Route (Stores User in Session)
// // app.post("/login", (req, res) => {
// //   const { email, password } = req.body;

// //   // Mock user verification (In real-world, check with User Service)
// //   if (email === "admin@example.com" && password === "password") {
// //     req.session.user = { email, role: "admin" };
// //     return res.json({ message: "Login successful", user: req.session.user });
// //   }
// //   res.status(401).json({ message: "Invalid credentials" });
// // });

// // // 🔹 Logout Route (Clears Session)
// // app.post("/logout", (req, res) => {
// //   req.session.destroy(() => {
// //     res.json({ message: "Logged out successfully" });
// //   });
// // });

// // // 🔹 Protected Route Example (Only Authenticated Users Can Access)
// // app.get("/profile", authMiddleware, (req, res) => {
// //   res.json({ message: "Profile accessed", user: req.session.user });
// // });

// // // Start API Gateway
// // app.listen(PORT, () => {
// //   console.log(`🚀 API Gateway running on port ${PORT}`);
// // });
// const express = require("express");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// app.use(express.json()); // Middleware to parse JSON

// // Load microservice URLs from .env
// const PRODUCT_SERVICE =
//   process.env.PRODUCT_SERVICE_URL || "http://localhost:5001";
// const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:5002";
// const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || "http://localhost:5003";
// const PAYMENT_SERVICE =
//   process.env.PAYMENT_SERVICE_URL || "http://localhost:5004";

// // Function to handle forwarding requests
// const forwardRequest = async (req, res, serviceUrl) => {
//   try {
//     const response = await axios({
//       method: req.method,
//       url: `${serviceUrl}${req.originalUrl}`, // Forwarding the exact URL
//       data: req.body, // Passing request body
//       headers: req.headers, // Forwarding headers (important for auth if needed)
//     });
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     if (error.response) {
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       res
//         .status(500)
//         .json({ message: "Internal Server Error", error: error.message });
//     }
//   }
// };

// // ✅ Routes Forwarding for Each Service
// app.use("/products", (req, res) => forwardRequest(req, res, PRODUCT_SERVICE));
// app.use("/users", (req, res) => forwardRequest(req, res, USER_SERVICE));
// app.use("/orders", (req, res) => forwardRequest(req, res, ORDER_SERVICE));
// app.use("/payments", (req, res) => forwardRequest(req, res, PAYMENT_SERVICE));

// // ✅ Health Check Route
// app.get("/", (req, res) => {
//   res.send("API Gateway is running and forwarding requests correctly!");
// });

// // Start the API Gateway
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`API Gateway running on port ${PORT}`);
// });
const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors"); // Import CORS package

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json()); // Middleware to parse JSON

// Load microservice URLs from .env
const PRODUCT_SERVICE =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:5001";
const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:5002";
const ORDER_SERVICE = process.env.ORDER_SERVICE_URL || "http://localhost:5003";
const PAYMENT_SERVICE =
  process.env.PAYMENT_SERVICE_URL || "http://localhost:5004";

// Function to handle forwarding requests
const forwardRequest = async (req, res, serviceUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${serviceUrl}${req.originalUrl}`, // Forwarding the exact URL
      data: req.body, // Passing request body
      headers: req.headers, // Forwarding headers (important for auth if needed)
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
};

// ✅ Routes Forwarding for Each Service
app.use("/products", (req, res) => forwardRequest(req, res, PRODUCT_SERVICE));
app.use("/users", (req, res) => forwardRequest(req, res, USER_SERVICE));
app.use("/orders", (req, res) => forwardRequest(req, res, ORDER_SERVICE));
app.use("/payments", (req, res) => forwardRequest(req, res, PAYMENT_SERVICE));

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("API Gateway is running and forwarding requests correctly!");
});

// Start the API Gateway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
