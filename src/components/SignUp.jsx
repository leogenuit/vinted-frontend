import React, { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
const SignUp = () => {
  //   const [coordinates, setCoordinates] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("yo");
    useEffect(() => {
      const sendUserInfos = async () => {
        try {
          await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            {
              name: name,
              email: email,
              password: password,
              newsLetter: newsLetter,
            }
          );
        } catch (error) {
          console.log("eroor : ", error);
        }
      };
      sendUserInfos();
    }, []);
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
          value={name}
          setValue={setName}
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
        <input onClick={() => setNewsLetter(!newsLetter)} type="checkbox" />
        <button>Envoyer</button>
      </form>
    </div>
  );
};

export default SignUp;
