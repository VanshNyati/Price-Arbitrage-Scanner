# Price-Arbitrage-Scanner

A real-time cryptocurrency price arbitrage scanner that monitors price differences across multiple exchanges to identify profitable trading opportunities.

## Overview

Price-Arbitrage-Scanner is a web-based application that helps traders identify price disparities of cryptocurrencies across different exchanges. By monitoring real-time price feeds, it automatically detects potential arbitrage opportunities, enabling users to make informed trading decisions.

## Features

- Real-time price monitoring across multiple cryptocurrency exchanges
- Automated arbitrage opportunity detection
- User-friendly web interface
- Backend API for price data aggregation
- Frontend dashboard for visualizing opportunities

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/VanshNyati/Price-Arbitrage-Scanner.git
   cd Price-Arbitrage-Scanner
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

## Usage

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   ```

3. Access the application through your web browser at `http://localhost:3000`

## Technical Implementation

### Backend

The backend is built using Node.js and implements:

- RESTful API endpoints for data retrieval
- Price comparison algorithms
- Data aggregation services

### Frontend

The frontend is developed using:

- React.js for the user interface
- Real-time data visualization

## API Documentation

### Price Data Endpoint

```plaintext
GET /api/tokens
```

Returns current prices from all monitored exchanges.

### Arbitrage Opportunities Endpoint

```plaintext
GET /api/arbitrage
```

### Binance Data Preprocess Endpoint

```plaintext
GET /api/preprocessed-data
```

### Price Pridiction Endpoint

```plaintext
GET /api/predict-price
```

Returns current arbitrage opportunities above the specified threshold.

## Development Choices

1. **Real-time Updates**: WebSocket implementation chosen for minimal latency in price updates.
2. **Modular Architecture**: Separated frontend and backend for better scalability and maintenance.
3. **Data Accuracy**: Multiple validation layers to ensure price data accuracy.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
