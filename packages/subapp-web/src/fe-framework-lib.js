import React from "react";
import { render, hydrate } from "react-dom";

export default {
  renderToElement({ Component, serverSideRendering, element, props }) {
    if (element) {
      if (serverSideRendering) {
        hydrate(<Component {...props} />, element);
      } else {
        render(<Component {...props} />, element);
      }
    } else {
      return <Component {...props} />;
    }
  }
};
