/*
 */

import React from "react";
import styles from "./styles.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>
          If CSS modules is working, then the following text should be large, centered, with a thick
          blue border.
        </h2>
        <div className={`${styles.wrapper}`}>Hello World!</div>
        <h2>
          If the styleName syntax is working, then the following text should have the same effect.
        </h2>
        <div styleName="styles.wrapper">CSS Module using styleName!</div>
        <h2>Make sure to also verify SSR result by disable JavaScript.</h2>
      </div>
    );
  }
}

export default Home;
