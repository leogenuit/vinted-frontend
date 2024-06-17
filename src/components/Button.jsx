import React from "react";

const Button = ({ text }) => {
  return (
    <button className="border-2 rounded-md px-8 py-1 border-solid border-blue-vinted text-blue-vinted hover:text-white hover:bg-blue-vinted">
      {text}
    </button>
  );
};

export default Button;
