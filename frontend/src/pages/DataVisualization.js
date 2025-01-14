import React, { useState, useEffect } from "react";
import axios from "axios";

const DataVisualization = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [selectedToken, setSelectedToken] = useState("BTCUSDT");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/preprocessed-data?token=${selectedToken}`
                );
                setData(response.data);
            } catch (err) {
                console.error("Error fetching preprocessed data:", err.message);
                setError("Failed to fetch preprocessed data. Please try again.");
            }
        };

        fetchData();
    }, [selectedToken]);

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Data Visualization</h1>
            <div className="mb-4">
                <label htmlFor="token-select" className="mr-4 font-bold">
                    Select Token:
                </label>
                <select
                    id="token-select"
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="BTCUSDT">BTC/USDT</option>
                    <option value="ETHUSDT">ETH/USDT</option>
                    <option value="SOLUSDT">SOL/USDT</option>
                </select>
            </div>
            {data.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Time</th>
                            <th className="border px-4 py-2">Open</th>
                            <th className="border px-4 py-2">High</th>
                            <th className="border px-4 py-2">Low</th>
                            <th className="border px-4 py-2">Close</th>
                            <th className="border px-4 py-2">Moving Average</th>
                            <th className="border px-4 py-2">RSI</th>
                            <th className="border px-4 py-2">Volatility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{new Date(row.time).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{row.open.toFixed(2)}</td>
                                <td className="border px-4 py-2">{row.high.toFixed(2)}</td>
                                <td className="border px-4 py-2">{row.low.toFixed(2)}</td>
                                <td className="border px-4 py-2">{row.close.toFixed(2)}</td>
                                <td className="border px-4 py-2">{row.movingAverage?.toFixed(2) || "N/A"}</td>
                                <td className="border px-4 py-2">{row.rsi?.toFixed(2) || "N/A"}</td>
                                <td className="border px-4 py-2">{row.volatility?.toFixed(2) || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-4">No data available to display.</p>
            )}
        </div>
    );
};

export default DataVisualization;
