// Fees.js
const calculateEffectivePrice = (price, feePercent, transactionCost = 0) => {
    return price * (1 - feePercent / 100) - transactionCost; // Adjusted for fees and transaction cost
};

// Fee constants
const BINANCE_FEE_PERCENT = 0.1; // 0.1% maker/taker fee
const SOLANA_FEE_PERCENT = 0.3; // 0.3% fee for DEX swaps
const SOLANA_TRANSACTION_COST = 0.00025; // Example Solana transaction cost in USD

module.exports = { calculateEffectivePrice, BINANCE_FEE_PERCENT, SOLANA_FEE_PERCENT, SOLANA_TRANSACTION_COST };
