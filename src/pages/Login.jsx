import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import ButtonSecondary from "../components/ButtonSecondary";
import { Link } from "react-router-dom";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 15 });
        setToken(response.data.token);
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-8 mx-auto w-1/6">
      <h1 className="text-center text-2xl font-light pb-8">Se Connecter</h1>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 ">
          <Input
            type="mail"
            placeholder="Adresse Mail"
            value={email}
            setValue={setEmail}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
          <div>
            <ButtonSecondary text="Se connecter" width="w-full" />
            <Link to="/signup">
              <p className="text-xs text-center pt-4 text-blue-vinted">
                Pas encore de coompte ? Inscris toi !
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
