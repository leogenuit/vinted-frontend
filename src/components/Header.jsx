import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";
import Cookies from "js-cookie";
import Button from "./Button";
import ButtonTercary from "./ButtonTercary";
import ButtonSecondary from "./ButtonSecondary";

const Header = ({ token, setToken, search, setSearch }) => {
  return (
    <nav className="w-4/6 mx-auto mb-8 flex justify-between items-center py-5 container pb-8 border-b-2">
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
        <div className="flex gap-8">
          <Link to={token ? "/publish" : "/login"}>
            <ButtonSecondary text="Vends tes articles" />
          </Link>

          <button
            text={"Se deconnecter"}
            onClick={() => {
              Cookies.remove("token");
              setToken(null);
            }}
          >
            <ButtonTercary text={"Se déconnecter"} />
          </button>
        </div>
      ) : (
        <ul className="flex gap-5">
          <li>
            <Link to="/signup">
              <Button text="S'inscrire" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button text="Se connecter" />
            </Link>
          </li>
        </ul>

      )}
    </nav>
  );
};

export default Header;
