import React from "react";

const Button = ({ text, width }) => {
  return (
    <button
      className={`${width} border-2 rounded-md px-8 py-1 border-solid border-blue-vinted bg-blue-vinted text-white hover:text-blue-vinted hover:bg-white`}
    >
      {text}
    </button>
  );
};

export default Button;
