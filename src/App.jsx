import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import ProofOfDeliveryDemo from "./ProofOfDeliveryDemo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-form" element={<ProofOfDeliveryDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
