import React, { useState, useEffect } from "react";
import axios from "axios";

const Arbitrage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArbitrage = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/arbitrage");
                setOpportunities(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching arbitrage opportunities:", err.message);
                setError("Failed to fetch arbitrage opportunities. Please try again later.");
                setLoading(false);
            }
        };

        fetchArbitrage();
    }, []);

    if (loading) return <p className="text-blue-500 text-center">Loading arbitrage opportunities...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Arbitrage Opportunities</h1>
            <div className="grid gap-4">
                {opportunities.map((opportunity, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow">
                        <p><span className="font-bold">Pair:</span> {opportunity.pair}</p>
                        <p><span className="font-bold">Buy On:</span> {opportunity.buyOn}</p>
                        <p><span className="font-bold">Sell On:</span> {opportunity.sellOn}</p>
                        <p><span className="font-bold">Profit:</span> ${opportunity.profit.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Arbitrage;
