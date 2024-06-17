import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../components/ButtonSecondary";
import { Link } from "react-router-dom";
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
    <div className="pt-8 mx-auto w-1/6">
      <h1 className="text-center text-2xl font-light pb-8">S'inscrire</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
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
        <div>
          <div className="flex gap-4 pb-2">
            <input
              className="w-6"
              type="checkbox"
              onClick={() => setNewsletter(!newsletter)}
              checked={newsletter}
            />
            <p className="text-gray-500 text-lg">
              S'inscrire à notre newsletter
            </p>
          </div>
          <p className="text-gray-500 text-xs pb-8">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <ButtonSecondary text="S'inscrire" width="w-full" />
          <Link to="/login">
            <p className="text-xs text-center pt-4 text-blue-vinted">
              Tu as déjà un compte ? Connecte toi !
            </p>
          </Link>
        </div>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SignUp;
