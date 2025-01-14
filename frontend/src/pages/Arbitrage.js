import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { paginate } from "../components/Pagination";

const Arbitrage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchArbitrage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/arbitrage");
        setOpportunities(response.data);
      } catch (err) {
        console.error("Error fetching arbitrage opportunities:", err.message);
        setError(
          "Failed to fetch arbitrage opportunities. Please try again later."
        );
      }
    };

    fetchArbitrage();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  const totalItems = opportunities.length;
  const currentPageData = paginate(opportunities, currentPage, pageSize);

  const handlePageChange = (page) => {
    if (
      page !== "..." &&
      page >= 1 &&
      page <= Math.ceil(totalItems / pageSize)
    ) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Arbitrage Opportunities (With Fees)
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Pair</th>
            <th className="border p-2">Buy On</th>
            <th className="border p-2">Sell On</th>
            <th className="border p-2">Profit (USD)</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((opportunity, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{opportunity.pair}</td>
              <td className="border p-2">{opportunity.buyOn}</td>
              <td className="border p-2">{opportunity.sellOn}</td>
              <td
                className={`border p-2 ${
                  opportunity.profit > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${opportunity.profit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Arbitrage;
