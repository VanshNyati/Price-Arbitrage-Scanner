const fetchSolanaPrices = async () => {
    try {
        console.log("Using mock data for Solana prices.");
        // Mock data for USDC trading pairs
        const mockPrices = [
            { pair: "BTC/USDC", price: 49000 },
            { pair: "ETH/USDC", price: 3300 },
            { pair: "SOL/USDC", price: 22.5 },
        ];
        return mockPrices;
    } catch (error) {
        console.error("Error fetching Solana prices:", error.message);
        throw error;
    }
};

module.exports = { fetchSolanaPrices };
