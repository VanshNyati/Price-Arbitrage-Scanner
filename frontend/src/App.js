import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Arbitrage from "./pages/Arbitrage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
