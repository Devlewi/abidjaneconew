
import React from "react";
import "./styles/Spinner.css"; // Importe les styles CSS du spinner

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
