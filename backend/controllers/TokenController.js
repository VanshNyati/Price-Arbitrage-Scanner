const { fetchBinancePrices } = require("../api/Binance");
const { fetchSolanaPrices } = require("../api/Solana");
const { calculateEffectivePrice, BINANCE_FEE_PERCENT, SOLANA_FEE_PERCENT } = require("../utils/Fees");

const getTokens = async (req, res) => {
    try {
        const binancePrices = await fetchBinancePrices();
        const solanaPrices = await fetchSolanaPrices();

        const tokens = {
            binance: binancePrices
                .filter((token) => Number(token.price) > 0) 
                .map((token) => ({
                    pair: token.pair,
                    price: Number(token.price).toFixed(2),
                })),
            solana: solanaPrices
                .filter((token) => Number(token.price) > 0) 
                .map((token) => ({
                    pair: token.pair,
                    price: Number(token.price).toFixed(2),
                })),
        };
        res.json(tokens);
    } catch (error) {
        console.error("Error fetching token prices:", error.message);
        res.status(500).json({ error: "Failed to fetch token prices" });
    }
};

const calculateArbitrage = async (req, res) => {
    try {
        const binancePrices = await fetchBinancePrices();
        const solanaPrices = await fetchSolanaPrices();

        const opportunities = [];
        binancePrices.forEach((binanceToken) => {
            const solanaToken = solanaPrices.find(
                (token) => token.pair.replace("/", "") === binanceToken.pair.replace("/", "")
            );
            if (solanaToken) {
                const binancePrice = Number(binanceToken.price);
                const solanaPrice = Number(solanaToken.price);
                if (binancePrice > 0 && solanaPrice > 0) {
                    const binancePriceAfterFees = calculateEffectivePrice(binancePrice, BINANCE_FEE_PERCENT);
                    const solanaPriceAfterFees = calculateEffectivePrice(solanaPrice, SOLANA_FEE_PERCENT);
                    if (binancePriceAfterFees < solanaPriceAfterFees) {
                        opportunities.push({
                            pair: binanceToken.pair,
                            buyOn: "Binance",
                            sellOn: "Solana",
                            profit: (solanaPriceAfterFees - binancePriceAfterFees).toFixed(2),
                        });
                    } else if (solanaPriceAfterFees < binancePriceAfterFees) {
                        opportunities.push({
                            pair: binanceToken.pair,
                            buyOn: "Solana",
                            sellOn: "Binance",
                            profit: (binancePriceAfterFees - solanaPriceAfterFees).toFixed(2),
                        });
                    }
                }
            }
        });
        res.json(opportunities);
    } catch (error) {
        console.error("Error calculating arbitrage opportunities:", error.message);
        res.status(500).json({ error: "Failed to calculate arbitrage opportunities" });
    }
};

module.exports = { getTokens, calculateArbitrage };
