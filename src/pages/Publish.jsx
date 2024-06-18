import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("0");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title),
        formData.append("description", description),
        formData.append("price", price),
        formData.append("condition", condition),
        formData.append("city", place),
        formData.append("brand", brand),
        formData.append("size", size),
        formData.append("color", color),
        formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/offer/${response.data._id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return token ? (
    <div>
      <h1>Publish</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-96">
        <label
          htmlFor="picture"
          className="text-blue-vinted border-blue-vinted border-2 w-48 pl-3"
        >
          ⊕ Ajouter une photo
        </label>
        {picture && <img src={URL.createObjectURL(picture)} alt="" />}
        <input
          className="hidden"
          id="picture"
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        >
          {/* <ButtonSecondary text={"clique"} /> */}
        </input>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />

        <input
          type="text"
          placeholder="Taille"
          onChange={(event) => setSize(event.target.value)}
          value={size}
        />
        <input
          type="text"
          placeholder="Couleur"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <input
          type="text"
          placeholder="Etat"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        />
        <input
          type="text"
          placeholder="Ville"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
        />
        <input
          type="number"
          placeholder="200"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
