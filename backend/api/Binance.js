const axios = require("axios");

const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

const fetchBinancePrices = async () => {
    try {
        const response = await axios.get(BINANCE_API_URL);
        const data = response.data;
        const usdcPairs = data.filter((pair) => pair.symbol.endsWith("USDC"));
        return usdcPairs.map((pair) => ({
            pair: pair.symbol,
            price: parseFloat(pair.price),
        }));
    } catch (error) {
        console.error("Error fetching Binance prices:", error.message);
        throw error;
    }
};

module.exports = { fetchBinancePrices };
