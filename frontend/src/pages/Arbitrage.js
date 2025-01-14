import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination, { paginate } from "../components/Pagination";

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
                setError("Failed to fetch arbitrage opportunities.");
            }
        };

        fetchArbitrage();
    }, []);

    const paginatedOpportunities = paginate(opportunities, currentPage, pageSize);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Arbitrage Opportunities</h1>
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : opportunities.length === 0 ? (
                <p className="text-gray-600 text-center">No arbitrage opportunities available at the moment.</p>
            ) : (
                <>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                {["Pair", "Buy On", "Sell On", "Profit (USD)"].map((header) => (
                                    <th key={header} className="border p-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOpportunities.map((opportunity, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border p-2">{opportunity.pair}</td>
                                    <td className="border p-2">{opportunity.buyOn}</td>
                                    <td className="border p-2">{opportunity.sellOn}</td>
                                    <td className="border p-2 text-green-500">${opportunity.profit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        totalItems={opportunities.length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Arbitrage;
