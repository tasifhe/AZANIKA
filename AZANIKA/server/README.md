# AZANIKA Server Documentation

## Overview
AZANIKA is a women fashion accessories e-commerce platform that provides a seamless shopping experience for users. This server-side application is built using Node.js and TypeScript, serving as the backend for the AZANIKA client application.

## Project Structure
The server is organized into several key directories:

- **src**: Contains the main application code.
  - **controllers**: Handles the business logic for different routes.
    - `auth.ts`: User authentication functions (login, registration).
    - `products.ts`: Functions for managing products (fetching, creating).
    - `orders.ts`: Functions for handling orders (creating, retrieving).
  - **models**: Defines the data models used in the application.
    - `User.ts`: User model representing user data.
    - `Product.ts`: Product model representing product data.
    - `Order.ts`: Order model representing order data.
  - **routes**: Sets up the API endpoints.
    - `auth.ts`: Authentication-related routes.
    - `products.ts`: Product-related routes.
    - `orders.ts`: Order-related routes.
  - **middleware**: Contains middleware functions for request handling.
    - `auth.ts`: Middleware for authenticating requests.
  - **config**: Configuration files for the application.
    - `database.ts`: Database connection settings.
  - `app.ts`: Entry point for the server application, setting up middleware and routes.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- TypeScript
- A MongoDB database (or any other database of your choice)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/AZANIKA.git
   cd AZANIKA/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/config/database.ts`.

### Running the Server
To start the server, run:
```
npm run start
```
The server will be running on `http://localhost:5000` (or the port specified in your configuration).

### API Endpoints
- **Authentication**
  - `POST /api/auth/login`: Log in a user.
  - `POST /api/auth/register`: Register a new user.

- **Products**
  - `GET /api/products`: Retrieve a list of products.
  - `POST /api/products`: Create a new product.

- **Orders**
  - `GET /api/orders`: Retrieve a list of orders.
  - `POST /api/orders`: Create a new order.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries, please reach out to [your email] or visit our [Facebook page](https://www.facebook.com/AzanikaFashion).