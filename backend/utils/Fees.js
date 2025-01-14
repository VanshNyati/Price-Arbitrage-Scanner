const calculateEffectivePrice = (price, feePercent) => {
    return price * (1 - feePercent / 100); 
};

const BINANCE_FEE_PERCENT = 0.1; 
const SOLANA_FEE_PERCENT = 0.3; 

module.exports = { calculateEffectivePrice, BINANCE_FEE_PERCENT, SOLANA_FEE_PERCENT };
