# E-Commerce Microservices Application

This repository contains the code for a scalable, modular e-commerce application built using a microservices architecture. The backend services are fully developed, while the frontend is currently under construction. This project aims to showcase the flexibility and scalability of microservices in building complex e-commerce platforms.

## Architecture Overview

The application is designed using a microservices architecture, where each service is responsible for a specific domain. The key services in the system include:

- **Authentication Service:** Manages user registration, login, and authentication using JWT.
- **Product Service:** Handles product catalog management, including product details, categories, and inventory.
- **Order Service:** Processes orders and manages order details, including payment processing.
- **Cart Service:** Manages the shopping cart, allowing users to add and remove products.
- **Notification Service:** Sends email notifications for order status updates and other user interactions.

## Technology Stack

### Backend (Completed)

- **Node.js & Express:** The backend services are developed using Node.js and Express for building RESTful APIs and handling HTTP requests.
- **MongoDB & Mongoose:** MongoDB is used as the database to store product, user, and order information, with Mongoose providing an elegant solution for interacting with the database.
- **RabbitMQ:** RabbitMQ serves as the message queue system, facilitating communication between microservices.
- **Docker:** All services are containerized using Docker to ensure consistent deployment across environments and improve scalability.

### Frontend (In Progress)

- **React.js & Next.js:** The frontend is under development, with plans to use React.js and Next.js for a responsive and fast user interface.
- **Redux/Context API:** These tools will be used for state management to handle global application state.

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AmaedaQ/ecommerce-microservices.git
   cd ecommerce-microservices
