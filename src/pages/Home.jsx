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
    <div>
      {isLoading ? (
        <div>
          <p>Chargement des offres</p>
        </div>
      ) : (
        <div className="flex justify-between flex-wrap gap-2 mx-auto w-4/6 ">
          {tab.offers.map((offer) => {
            return (
              <Link to={`/offers/${offer._id}`} key={offer._id}>
                <div key={offer._id} className="w-60 mb-6 shadow-md">
                  <div className="flex p-2 gap-3">
                    <img
                      className="w-5 max-h-8"
                      src={offer.owner.account.avatar?.secure_url}
                      alt="user avatar"
                    />
                    <p className="text-xs text-gray-400">
                      {offer.owner.account.username}
                    </p>
                  </div>
                  <img
                    className="w-full min-h-80 max-h-80 pb-2 "
                    src={offer.product_image.url}
                    alt="img"
                  />
                  <div className="p-2">
                    <p className="text-sm">{offer.product_price} €</p>

                    {offer.product_details.map((detail) => {
                      return (
                        <div className="text-xs text-gray-400">
                          <p>{detail.ÉTAT}</p>
                          <p>{detail.MARQUE}</p>
                        </div>
                      );
                    })}
                  </div>
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
