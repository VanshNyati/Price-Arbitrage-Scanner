const axios = require("axios");
const { preprocessData } = require("../utils/Preprocess");

// Fetch Historical Data from Binance
const fetchHistoricalData = async (token) => {
    const binanceAPI = "https://api.binance.com/api/v3/klines";
    const params = {
        symbol: token,
        interval: "1d",
        limit: 100,
    };

    try {
        const response = await axios.get(binanceAPI, { params });
        return response.data.map((entry) => ({
            time: entry[0],
            open: parseFloat(entry[1]),
            high: parseFloat(entry[2]),
            low: parseFloat(entry[3]),
            close: parseFloat(entry[4]),
            volume: parseFloat(entry[5]),
        }));
    } catch (error) {
        console.error("Error fetching historical data:", error.message);
        throw new Error("Failed to fetch historical data from Binance.");
    }
};

// Fetch and Preprocess Data
const fetchAndPreprocessData = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: "Token symbol is required." });
    }

    try {
        const rawData = await fetchHistoricalData(token);
        const preprocessedData = preprocessData(rawData);
        res.json(preprocessedData);
    } catch (error) {
        console.error("Error in fetchAndPreprocessData:", error.message);
        res.status(500).json({ error: "Failed to fetch and preprocess data." });
    }
};

module.exports = { fetchAndPreprocessData };
