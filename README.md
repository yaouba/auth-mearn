
# auth-mearn

A **MEARN (MongoDB, Express, React, Node)** based authentication boilerplate. This project provides a secure authentication solution with user registration, login, and token-based authentication.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## About

This project is an authentication boilerplate built using the MEARN stack. It allows developers to implement a standard authentication setup in their applications, leveraging JWT (JSON Web Token) for secure access.

## Features

- User registration and login
- JWT-based authentication
- Password hashing for secure storage
- Role-based access (optional)
- Basic structure for user management

## Technologies Used

- **MongoDB** - Database for storing user data
- **Express.js** - Backend framework
- **React.js** - Frontend framework
- **Node.js** - Backend runtime environment
- **JWT** - JSON Web Token for secure authentication

## Installation

### Prerequisites

- Node.js (>= v14)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yaouba/auth-mearn.git
   cd auth-mearn
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the root of the backend directory with the following:

```dotenv
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-mearn
JWT_SECRET=your_jwt_secret
```

## Usage

### Running the Backend

1. **Navigate to the backend directory**

   ```bash
   cd backend
   ```

2. **Start the backend server**

   ```bash
   npm start
   ```

### Running the Frontend

1. **Navigate to the frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Start the frontend server**

   ```bash
   npm start
   ```

The application should now be running with the backend on `localhost:5000` and the frontend on `localhost:3000`.

## API Endpoints

### Auth Routes

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user and receive a token
- **GET** `/api/auth/me` - Get current user info (requires token)

> Note: For protected routes, include the token in the `Authorization` header as `Bearer <token>`.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.
