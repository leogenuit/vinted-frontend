import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <h1>Page Offer</h1>
      <img src={data.product_image.secure_url} alt={data.product_name} />
      {data.product_details.map((detail, index) => {
        console.log("élément dans le tableau   ", detail);
        const keys = Object.keys(detail);
        console.log("liste des clefs   ", keys);
        const key = keys[0];
        console.log("clef sortie du tableau  ", key);
        return (
          <p key={index}>
            {key} {detail[key]}
          </p>
        );
      })}
    </main>
  );
};

export default Offer;
