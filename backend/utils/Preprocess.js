const calculateMovingAverage = (data, period) => {
    if (data.length < period) return Array(data.length).fill(null);

    const movingAverages = [];
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const avg = slice.reduce((sum, val) => sum + val, 0) / period;
        movingAverages.push(avg);
    }
    return Array(period - 1).fill(null).concat(movingAverages);
};

const calculateRSI = (data, period = 14) => {
    if (data.length < period) return Array(data.length).fill(null);

    const rsi = [];
    for (let i = period; i < data.length; i++) {
        let gains = 0,
            losses = 0;
        for (let j = i - period; j < i; j++) {
            const change = data[j + 1] - data[j];
            if (change > 0) gains += change;
            else losses -= change;
        }
        const avgGain = gains / period;
        const avgLoss = losses / period || 1; // Avoid division by zero
        const rs = avgGain / avgLoss;
        rsi.push(100 - 100 / (1 + rs));
    }
    return Array(period).fill(null).concat(rsi);
};

const calculateVolatility = (data, period = 14) => {
    if (data.length < period) return Array(data.length).fill(null);

    const volatility = [];
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const mean = slice.reduce((sum, val) => sum + val, 0) / slice.length;
        const variance = slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / slice.length;
        volatility.push(Math.sqrt(variance));
    }
    return Array(period - 1).fill(null).concat(volatility);
};

const preprocessData = (prices) => {
    const closePrices = prices.map((p) => p.close);
    return prices.map((price, index) => ({
        ...price,
        movingAverage: calculateMovingAverage(closePrices, 14)[index] || null,
        rsi: calculateRSI(closePrices, 14)[index] || null,
        volatility: calculateVolatility(closePrices, 14)[index] || null,
    }));
};

module.exports = { preprocessData };
