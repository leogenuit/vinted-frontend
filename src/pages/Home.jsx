import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    console.log("yo");
  }, []);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <Link to="/offer">View all offers</Link>
    </div>
  );
};

export default Home;
