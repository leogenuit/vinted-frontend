import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ search }) => {
  const [tab, setTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        setTab(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);
  return (
    <div className="container">
      {isLoading ? (
        <div>
          <p>Chargement des offres</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5 ">
          {tab.offers.map((offer) => {
            return (
              <Link to={`/offers/${offer._id}`} key={offer._id}>
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
