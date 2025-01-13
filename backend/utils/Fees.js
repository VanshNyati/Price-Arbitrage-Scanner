// Calculate effective price after percentage-based fees and fixed costs
const calculateEffectivePrice = (price, feePercent, fixedCost = 0) => {
    return (price * (1 - feePercent / 100)) - fixedCost;
};

// Serum taker fee (0.22%)
const SERUM_TAKER_FEE = 0.22; // 0.22% fee

// Solana transaction cost (average in USDC)
const SOLANA_TRANSACTION_COST = 0.00025; // Fixed cost in USDC

// Binance taker fee (0.1% default)
const BINANCE_TAKER_FEE = 0.1; // 0.1% fee

// Simulate slippage (optional, ~0.05% impact)
const simulateSlippage = (price, slippagePercent = 0.05) => {
    const slippageFactor = 1 + (slippagePercent / 100);
    return price * slippageFactor; // Simulate slippage
};

module.exports = {
    calculateEffectivePrice,
    SERUM_TAKER_FEE,
    SOLANA_TRANSACTION_COST,
    BINANCE_TAKER_FEE,
    simulateSlippage,
};
