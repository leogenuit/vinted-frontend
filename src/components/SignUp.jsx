import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
          password,
          newsletter,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 15 });
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cette email est déjà utilisé");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("champs manquant");
      }
      console.log("eroor : ", error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">S'inscrire</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-solid border-red-500 border-2"
      >
        <Input
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          setValue={setUsername}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <Input
          placeholder="Mot de passe"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <input
          type="checkbox"
          onClick={() => setNewsletter(!newsletter)}
          checked={newsletter}
        />
        <button>Envoyer</button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
