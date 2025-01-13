const { fetchBinancePrices } = require("../api/Binance");
const { fetchSolanaPrices } = require("../api/Solana");
const { calculateEffectivePrice } = require("../utils/Fees");

const getTokens = async (req, res) => {
    try {
        const binancePrices = await fetchBinancePrices();
        const solanaPrices = await fetchSolanaPrices();

        res.json({
            binance: binancePrices,
            solana: solanaPrices,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch token prices" });
    }
};

const calculateArbitrage = async (req, res) => {
    try {
        const binancePrices = await fetchBinancePrices();
        const solanaPrices = await fetchSolanaPrices();

        const opportunities = [];

        binancePrices.forEach((binancePair) => {
            const solanaPair = solanaPrices.find(
                (pair) => pair.pair.replace("/", "") === binancePair.pair
            );

            if (solanaPair) {
                const binancePriceAfterFees = calculateEffectivePrice(binancePair.price, 0.1);
                const solanaPriceAfterFees = calculateEffectivePrice(solanaPair.price, 0.3);

                if (binancePriceAfterFees < solanaPriceAfterFees) {
                    opportunities.push({
                        pair: binancePair.pair,
                        buyOn: "Binance",
                        sellOn: "Solana",
                        profit: solanaPriceAfterFees - binancePriceAfterFees,
                    });
                } else if (solanaPriceAfterFees < binancePriceAfterFees) {
                    opportunities.push({
                        pair: binancePair.pair,
                        buyOn: "Solana",
                        sellOn: "Binance",
                        profit: binancePriceAfterFees - solanaPriceAfterFees,
                    });
                }
            }
        });

        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ error: "Failed to calculate arbitrage opportunities" });
    }
};

module.exports = { getTokens, calculateArbitrage };
