import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [obj, setObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
      );

      setObj(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <h1>Home Page</h1>
      <Link to="/offer">View all offers</Link>

      {isLoading ? (
        <div>
          <p>Chargement des offres</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 ">
          {obj.offers.map((offer) => {
            return (
              <div key={offer._id} className="h-80 w-60 mb-20 ">
                <div className="flex mb-2 gap-3">
                  <img
                    className="w-5"
                    src={offer.owner.account.avatar.url}
                    alt="user avatar"
                  />
                  <p>{offer.owner.account.username}</p>
                </div>
                <img
                  className="w-full h-full "
                  src={offer.product_image.url}
                  alt="img"
                />
                <p>{offer.product_price} €</p>

                {offer.product_details.map((detail) => {
                  return (
                    <div>
                      <p>{detail.ÉTAT}</p>
                      <p>{detail.MARQUE}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
