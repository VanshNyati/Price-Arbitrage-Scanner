import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import TokenPrices from "./pages/TokenPrices";
import Arbitrage from "./pages/Arbitrage";
import DataVisualization from "./pages/DataVisualization";
import Prediction from "./pages/Prediction";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/token-prices" element={<TokenPrices />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
          <Route path="/data-visualization" element={<DataVisualization />} />
          <Route path="/prediction" element={<Prediction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
