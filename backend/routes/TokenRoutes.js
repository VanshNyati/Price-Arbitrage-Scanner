const express = require("express");
const { getTokens, calculateArbitrage } = require("../controllers/TokenController");

const router = express.Router();

router.get("/tokens", getTokens); 
router.get("/arbitrage", calculateArbitrage); 

module.exports = router;
