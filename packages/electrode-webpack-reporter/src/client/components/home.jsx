import React from "react";
import PropTypes from "prop-types";
import Navbar from "./navbar";

const Home = (props) => (
  <div>
    <Navbar />
    {props.children}
  </div>);

Home.propTypes = {
  children: PropTypes.array
};

export default Home;
