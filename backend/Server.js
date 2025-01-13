const express = require("express");
const dotenv = require("dotenv");
const tokenRoutes = require("./routes/TokenRoutes");
const cors = require("cors");
dotenv.config();
const app = express();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}));
app.use("/api", tokenRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the CEX/DEX Arbitrage Scanner API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
