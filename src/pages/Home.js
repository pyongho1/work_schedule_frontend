import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Work Schedule App</h1>
      <Link to="/employer">Employer</Link>
      <Link to="/employee">Employee</Link>
    </div>
  );
};

export default Home;
