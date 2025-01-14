const { fetchBinancePrices } = require("../api/Binance");
const { fetchSolanaPrices } = require("../api/Solana");
const {
    calculateEffectivePrice,
    BINANCE_FEE_PERCENT,
    SOLANA_FEE_PERCENT,
    SOLANA_TRANSACTION_COST,
} = require("../utils/Fees");

const getTokens = async (req, res) => {
    try {
        const binancePrices = await fetchBinancePrices();
        const solanaPrices = await fetchSolanaPrices();

        const tokens = {
            binance: binancePrices.filter((token) => token.price > 0).map((token) => ({
                pair: token.pair,
                price: token.price.toFixed(2),
            })),
            solana: solanaPrices.filter((token) => token.price > 0).map((token) => ({
                pair: token.pair,
                price: token.price.toFixed(2),
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

        const opportunities = binancePrices.map((binanceToken) => {
            const solanaToken = solanaPrices.find((token) => token.pair.replace("/", "") === binanceToken.pair);

            if (solanaToken) {
                const binancePriceAfterFees = calculateEffectivePrice(binanceToken.price, BINANCE_FEE_PERCENT);
                const solanaPriceAfterFees = calculateEffectivePrice(
                    solanaToken.price,
                    SOLANA_FEE_PERCENT,
                    SOLANA_TRANSACTION_COST
                );

                if (binancePriceAfterFees < solanaPriceAfterFees) {
                    return {
                        pair: binanceToken.pair,
                        buyOn: "Binance",
                        sellOn: "Solana",
                        profit: (solanaPriceAfterFees - binancePriceAfterFees).toFixed(2),
                    };
                } else if (solanaPriceAfterFees < binancePriceAfterFees) {
                    return {
                        pair: binanceToken.pair,
                        buyOn: "Solana",
                        sellOn: "Binance",
                        profit: (binancePriceAfterFees - solanaPriceAfterFees).toFixed(2),
                    };
                }
            }
            return null;
        });

        res.json(opportunities.filter((opportunity) => opportunity !== null));
    } catch (error) {
        console.error("Error calculating arbitrage opportunities:", error.message);
        res.status(500).json({ error: "Failed to calculate arbitrage opportunities" });
    }
};

module.exports = { getTokens, calculateArbitrage };
