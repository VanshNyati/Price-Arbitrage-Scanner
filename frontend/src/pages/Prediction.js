import React, { useState, useEffect } from "react";
import axios from "axios";

const Prediction = () => {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const tokens = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];
                const predictionsData = await Promise.all(
                    tokens.map(async (token) => {
                        const response = await axios.get(
                            `http://localhost:5000/api/predict-price?token=${token}`
                        );
                        return { token, price: response.data.predictedPrice };
                    })
                );
                setPredictions(predictionsData);
            } catch (err) {
                console.error("Error fetching predictions:", err.message);
                setError("Failed to fetch predictions. Please try again later.");
            }
        };

        fetchPredictions();
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Price Predictions</h1>
            <table className="table-auto w-full text-left border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Token</th>
                        <th className="border px-4 py-2">Predicted Price</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((prediction, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{prediction.token}</td>
                            <td className="border px-4 py-2 text-green-500">
                                ${prediction.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Prediction;
