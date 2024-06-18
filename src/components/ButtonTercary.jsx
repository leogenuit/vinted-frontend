import React from "react";

const Button = ({ text }) => {
  return (
    <button className="border-2 rounded-md px-8 py-1 border-solid border-red-500 text-red-500 hover:text-white hover:bg-red-500">
      {text}
    </button>
  );
};

export default Button;
