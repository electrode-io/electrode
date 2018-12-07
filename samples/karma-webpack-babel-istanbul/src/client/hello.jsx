import React from "react";

// webpack config.resolve.modules has "src" so it will find src/styles/demo.css
import styles from "styles/demo.css"; // eslint-disable-line

export default props => {
  // cause some uncovered lines to show in karma coverage report
  if (props.empty) {
    return <div />;
  } else {
    return <div>hello, world</div>;
  }
};
