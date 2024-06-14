import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";

const Header = () => {
  return (
    <nav className="flex justify-between items-center border-b-2 border-gray-500 border-solid py-5 container">
      <Link to="/">
        <img className="w-24" src={logo} alt="" />
      </Link>
      <ul className="flex gap-5">
        <li>
          <Link to="/sign-up">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="#">Sell articles</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
