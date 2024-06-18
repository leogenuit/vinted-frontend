import React from "react";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const location = useLocation();
  const { name } = location.state;
  return (
    <div className="w-2/6 mx-auto bg-gray-300">
      <p>Résumé de la commande</p>
    </div>
  );
};

export default Payment;
