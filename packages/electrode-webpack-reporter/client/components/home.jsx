import React, {PropTypes} from "react";
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
