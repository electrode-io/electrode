/*
 */

import React from "react";
import styles from "./styles.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={`${styles.wrapper}`}>Hello World!</div>;
  }
}

export default Home;
