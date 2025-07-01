import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import ProofOfDeliveryForm from "./ProofOfDeliveryForm";
import ProofOfDeliveryView from "./ProofOfDeliveryView.jsx";
import SearchPod from "./SearchPod.jsx";
import BackupPage from "./BackupPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-form" element={<ProofOfDeliveryForm />} />
        <Route path="/search" element={<SearchPod />} />
        <Route path="/backup" element={<BackupPage />} />
        <Route path="/view-form/:id" element={<ProofOfDeliveryView />} />
      </Routes>
    </Router>
  );
}

export default App;
