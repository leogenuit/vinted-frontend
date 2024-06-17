import React from "react";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
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
    <div className="container">
      <h1 className="text-center">Se Connecter</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-solid border-red-500 border-2"
        >
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
          <button>Se Connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
