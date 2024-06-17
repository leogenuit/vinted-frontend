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
    <div className="w-4/6 mx-auto flex gap-40">
      <img
        className="w-1/3 h-3/4 shadow-2xl"
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
              <p>yo</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offer;
