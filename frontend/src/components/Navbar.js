import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Arbitrage Scanner</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Landing
            </Link>
          </li>
          <li>
            <Link
              to="/token-prices"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Token Prices
            </Link>
          </li>
          <li>
            <Link
              to="/arbitrage"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Arbitrage
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
