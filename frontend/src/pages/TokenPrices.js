import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination, { paginate } from "../components/Pagination";

const TokenPrices = () => {
  const [binanceTokens, setBinanceTokens] = useState([]);
  const [solanaTokens, setSolanaTokens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tokens");
        setBinanceTokens(response.data.binance || []);
        setSolanaTokens(response.data.solana || []);
      } catch (err) {
        console.error("Error fetching token prices:", err.message);
        setError("Failed to fetch token prices. Please try again later.");
      }
    };

    fetchTokens();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  const paginatedBinanceTokens = paginate(binanceTokens, currentPage, pageSize);
  const paginatedSolanaTokens = paginate(solanaTokens, currentPage, pageSize);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Token Prices</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Binance Prices</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Token Pair</th>
                <th className="border px-4 py-2">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBinanceTokens.map((token, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{token.pair}</td>
                  <td className="border px-4 py-2">
                    ${token.price !== "N/A" ? token.price : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Solana Prices</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Token Pair</th>
                <th className="border px-4 py-2">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSolanaTokens.map((token, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{token.pair}</td>
                  <td className="border px-4 py-2">
                    ${token.price !== "N/A" ? token.price : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        totalItems={Math.max(binanceTokens.length, solanaTokens.length)}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TokenPrices;
