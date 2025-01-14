const express = require("express");
const { getTokens, calculateArbitrage } = require("../controllers/TokenController");
const { fetchAndPreprocessData } = require("../controllers/DataController");
const { getPrediction } = require("../controllers/PredictionController");

const router = express.Router();

router.get("/tokens", getTokens);
router.get("/arbitrage", calculateArbitrage);
router.get("/preprocessed-data", fetchAndPreprocessData);
router.get("/predict-price", getPrediction);

module.exports = router;
