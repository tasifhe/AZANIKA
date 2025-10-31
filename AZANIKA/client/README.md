# AZANIKA Client Application

Welcome to the AZANIKA client application! This project is designed to provide a seamless shopping experience for women's fashion accessories.

## Project Structure

The client application is structured as follows:

```
client/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global CSS styles for the application
│   │   ├── layout.tsx           # Layout component wrapping around pages
│   │   ├── page.tsx             # Main entry point rendering the homepage
│   │   ├── products/
│   │   │   └── page.tsx         # Products page listing available accessories
│   │   ├── cart/
│   │   │   └── page.tsx         # Shopping cart page showing added items
│   │   └── checkout/
│   │       └── page.tsx         # Checkout process for users
│   ├── components/
│   │   ├── Header.tsx           # Header component with navigation and branding
│   │   ├── Footer.tsx           # Footer component with additional links
│   │   ├── ProductCard.tsx      # Component displaying individual product details
│   │   ├── Cart.tsx             # Component managing the shopping cart display
│   │   └── Navigation.tsx       # Component handling site navigation links
│   ├── lib/
│   │   └── api.ts               # Functions for making API calls to the backend
│   └── types/
│       └── index.ts             # TypeScript types and interfaces used in the app
├── public/
│   └── favicon.ico              # Favicon for the website
├── package.json                  # npm configuration file for the client
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration settings
└── README.md                    # Documentation for the client application
```

## Getting Started

To get started with the AZANIKA client application, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd AZANIKA/client
   ```

2. **Install Dependencies**: 
   ```bash
   npm install
   ```

3. **Run the Development Server**: 
   ```bash
   npm run dev
   ```

4. **Open in Browser**: 
   Navigate to `http://localhost:3000` to view the application.

## Features

- **Responsive Design**: The application is designed to be mobile-friendly and responsive.
- **Product Listings**: Users can browse through a variety of fashion accessories.
- **Shopping Cart**: Users can add items to their cart and view them before checkout.
- **Checkout Process**: A streamlined checkout process for a smooth shopping experience.

## Contributing

If you would like to contribute to the AZANIKA project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Thank you for checking out the AZANIKA client application! We hope you enjoy your shopping experience.