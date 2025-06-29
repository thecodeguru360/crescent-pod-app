import React, { useState } from "react";
import ProofOfDeliveryForm from "./ProofOfDeliveryForm";
import ProofOfDeliveryView from "./ProofOfDeliveryView";

const ProofOfDeliveryDemo = () => {
  const [formData, setFormData] = useState(null);
  const [currentView, setCurrentView] = useState("form"); // "form" or "view"

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentView("view");
  };

  const handleBackToForm = () => {
    setCurrentView("form");
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
    },
    navigation: {
      marginBottom: "20px",
      display: "flex",
      gap: "10px",
    },
    navButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    activeButton: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navigation}>
        <button
          style={{
            ...styles.navButton,
            ...(currentView === "form" ? styles.activeButton : {}),
          }}
          onClick={() => setCurrentView("form")}
        >
          Form View
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(currentView === "view" ? styles.activeButton : {}),
            ...(formData ? {} : { opacity: 0.5, cursor: "not-allowed" }),
          }}
          onClick={() => formData && setCurrentView("view")}
          disabled={!formData}
        >
          Document View
        </button>
      </div>

      {currentView === "form" ? (
        <ProofOfDeliveryForm onSubmit={handleFormSubmit} />
      ) : (
        <ProofOfDeliveryView data={formData} />
      )}
    </div>
  );
};

export default ProofOfDeliveryDemo;
