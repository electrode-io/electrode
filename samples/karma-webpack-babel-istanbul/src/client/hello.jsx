import React from "react";

export default props => {
  if (props.empty) {
    return <div />;
  } else {
    return <div>hello, world</div>;
  }
};
