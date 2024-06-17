import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";
import Cookies from "js-cookie";

const Header = ({ token, setToken, search, setSearch }) => {
  return (
    <nav className="flex justify-between items-center py-5 container pb-8">
      <Link to="/">
        <img className="w-24" src={logo} alt="" />
      </Link>
      <input
        type="text"
        placeholder="Rechercher des articles"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      {token ? (
        <button
          onClick={() => {
            Cookies.remove("token");
            setToken(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <ul className="flex gap-5">
          <li>
            <Link to="/signup" className="border-2 border-solid border-red-500">
              Sign up
            </Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="#">Sell articles</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
