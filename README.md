# Techno Cart

Techno Cart is a MERN Stack application that provides a seamless shopping experience for customers and efficient management tools for administrators. Customers can walk into a retail shop, scan barcodes, self-checkout (Stripe integration pending), and download receipts. Admins can create shop accounts, manage products, restock inventory, view transaction history, and leverage regression models for demand forecasting.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
    - [Customer Portal](#customer-portal)
    - [Admin Portal](#admin-portal)
3. [Features](#features)
4. [Integration Roadmap](#integration-roadmap)
5. [Contributing](#contributing)
6. [License](#license)
7. [Screenshots](#screenshots)

## Installation

To get started with Techno Cart, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/techno-cart.git
    ```

2. Navigate to the project directory:
    ```bash
    cd techno-cart
    ```

3. Install dependencies for both the server and client:
    ```bash
    cd server && npm install
    cd ../client && npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the `server` directory and configure it with the necessary variables.

5. Start the server and client:
    ```bash
    cd ../server && npm start
    cd ../client && npm start
    ```

## Usage

### Customer Portal

The Customer Portal allows users to:

- Scan barcodes for product details.
- Self-checkout (Stripe integration pending).
- Download receipts for completed transactions.

### Admin Portal

The Admin Portal enables administrators to:

- Create and manage shop accounts.
- Add and manage products, including restocking functionality.
- View transaction history.
- Utilize regression models for demand forecasting (integration pending).

## Features

- **Self-Checkout**: Customers can scan barcodes and complete transactions independently.
- **Shop Management**: Admins can create and manage shop accounts.
- **Product Management**: Add, update, and restock products easily.
- **Transaction History**: Track and view transaction history for better insights.
- **Demand Forecasting**: Utilize regression models for forecasting demand (integration pending).

## Integration Roadmap

The application is continually evolving. Planned integrations include:

- **Stripe Integration**: Enable secure payment processing for customer transactions.
- **Regression Models**: Integrate advanced models for demand forecasting.

## Contributing

We welcome contributions! If you'd like to contribute to Techno Cart, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Screenshots

![S1](/ss/Screenshot%202023-12-05%20at%2012.45.28%E2%80%AFPM.png)

![S2](/ss/Screenshot%202023-12-05%20at%2012.45.37%E2%80%AFPM.png)
