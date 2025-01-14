const axios = require("axios");

const predictNextPrice = (historicalData) => {
    if (!historicalData.length) return 0;
    const closePrices = historicalData.map((data) => data.close);
    const avg = closePrices.reduce((acc, val) => acc + val, 0) / closePrices.length;
    return avg.toFixed(2);
};

const getPrediction = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: "Token symbol is required." });
    }

    try {
        const response = await axios.get(`http://localhost:5000/api/preprocessed-data?token=${token}`);
        const predictedPrice = predictNextPrice(response.data);
        res.json({ predictedPrice });
    } catch (error) {
        console.error("Error generating prediction:", error.message);
        res.status(500).json({ error: "Failed to generate prediction." });
    }
};

module.exports = { getPrediction };
