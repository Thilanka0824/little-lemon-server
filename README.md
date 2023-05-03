# E-Commerce Backend

This repository contains the backend of an e-commerce web application built using Node.js, Express, and MongoDB. It provides the API endpoints necessary for user authentication and cart management.

## Features

- User registration and login
- JWT-based authentication and authorization
- CRUD operations for user and cart data
- Password hashing with bcrypt
- Connects to MongoDB using Mongoose

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/ecommerce-backend.git
```

2. Install the dependencies:

```
cd ecommerce-backend
npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET_KEY=<your_jwt_secret_key>
CORS_ORIGIN=<your_frontend_origin>
```

4. Start the development server:

```
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### User

- `/api/users/register` - Register a new user
- `/api/users/login` - Login an existing user
- `/api/users/delete-user` - Delete an existing user
- `/api/users/authtoken` - Authenticate a user with their JWT token

### Cart

- `/api/cart` - Manage the cart (replace `/cart` with your actual cart routes)

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv
- cors