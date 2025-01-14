import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to Arbitrage Scanner
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Discover real-time arbitrage opportunities across Binance and Solana
        markets. Navigate through our features to analyze token prices and
        profitable trades.
      </p>
      <div className="flex space-x-6">
        <Link
          to="/token-prices"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          View Token Prices
        </Link>
        <Link
          to="/arbitrage"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Check Arbitrage Opportunities
        </Link>
      </div>
    </div>
  );
};

export default Landing;
