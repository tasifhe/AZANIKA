# AZANIKA Fashion Accessories

Welcome to the AZANIKA project! This repository contains the code for the AZANIKA e-commerce website, a platform dedicated to providing stylish and trendy fashion accessories for women.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using Next.js and Tailwind CSS. It contains the following key directories and files:

- **src/app**: Contains the main application files.
  - `globals.css`: Global CSS styles for the application.
  - `layout.tsx`: Layout component for consistent structure across pages.
  - `page.tsx`: Main entry point for the application (homepage).
  - **products**: Directory for product-related pages.
    - `page.tsx`: Displays the products page.
  - **cart**: Directory for the shopping cart page.
    - `page.tsx`: Renders the shopping cart.
  - **checkout**: Directory for the checkout process.
    - `page.tsx`: Handles user checkout.

- **src/components**: Contains reusable components.
  - `Header.tsx`: Navigation and branding component.
  - `Footer.tsx`: Provides additional information and links.
  - `ProductCard.tsx`: Displays individual product details.
  - `Cart.tsx`: Manages the display of items in the shopping cart.
  - `Navigation.tsx`: Handles site navigation links.

- **src/lib**: Contains utility functions.
  - `api.ts`: Functions for making API calls to the backend server.

- **src/types**: Contains TypeScript types and interfaces.

- **public**: Contains static assets like the favicon.

- `package.json`: Configuration file for npm, listing dependencies and scripts.

- `tailwind.config.js`: Configuration for Tailwind CSS.

- `next.config.js`: Configuration settings for Next.js.

### Server

The server is built using Node.js and Express. It contains the following key directories and files:

- **src/controllers**: Contains functions for handling various operations.
  - `auth.ts`: User authentication functions (login, registration).
  - `products.ts`: Functions for managing product-related operations.
  - `orders.ts`: Functions for handling order-related operations.

- **src/models**: Contains data models.
  - `User.ts`: Defines the User model.
  - `Product.ts`: Defines the Product model.
  - `Order.ts`: Defines the Order model.

- **src/routes**: Sets up routes for different endpoints.
  - `auth.ts`: Routes for authentication-related endpoints.
  - `products.ts`: Routes for product-related endpoints.
  - `orders.ts`: Routes for order-related endpoints.

- **src/middleware**: Contains middleware functions.
  - `auth.ts`: Middleware for authenticating requests.

- **src/config**: Contains configuration files.
  - `database.ts`: Handles database connection settings.

- `app.ts`: Entry point for the server application.

- `package.json`: Configuration file for npm, listing dependencies and scripts.

- `tsconfig.json`: Configuration file for TypeScript.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

4. Set up your database and update the configuration in `server/src/config/database.ts`.

5. Start the server:
   ```
   npm run start
   ```

6. Start the client:
   ```
   cd ../client
   npm run dev
   ```

Now you can access the AZANIKA e-commerce website in your browser!

## Contributing

We welcome contributions to improve the AZANIKA project. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.