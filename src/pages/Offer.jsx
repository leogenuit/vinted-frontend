import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ButtonSecondary from "../components/ButtonSecondary";

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
        console.log(response.data);
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
    <div>
      <div className="w-4/6 mx-auto ">
        <div className="flex gap-40">
          <img
            className="w-1/3 h-3/4 shadow-2xl "
            src={data.product_image.secure_url}
            alt={data.product_name}
          />
          <div className="bg-gray-200">
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              const key = keys[0];
              return (
                <div>
                  <p key={index}>
                    {key} {detail[key]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <p>ici {data.product_name}</p>
        <Link to="/payment" state={{ name: data.product_name }}>
          <ButtonSecondary text={"payer"} className="mx-auto" />
        </Link>
      </div>
    </div>
  );
};

export default Offer;
