import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [tokens, setTokens] = useState({ binance: [], solana: [] });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tokens");
                setTokens(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching token prices:", err.message);
                setError("Failed to fetch token prices. Please try again later.");
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    if (loading) return <p className="text-blue-500 text-center">Loading token prices...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Token Prices</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Binance Prices */}
                <div className="border rounded-lg p-4 shadow">
                    <h2 className="text-xl font-semibold mb-4">Binance Prices</h2>
                    <ul>
                        {tokens.binance.map((token, index) => (
                            <li key={index} className="border-b py-2">
                                <span className="font-bold">{token.pair}:</span> ${token.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Solana Prices */}
                <div className="border rounded-lg p-4 shadow">
                    <h2 className="text-xl font-semibold mb-4">Solana Prices</h2>
                    <ul>
                        {tokens.solana.map((token, index) => (
                            <li key={index} className="border-b py-2">
                                <span className="font-bold">{token.pair}:</span> ${token.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
