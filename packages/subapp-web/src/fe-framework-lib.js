import React from "react";
import { render, hydrate } from "react-dom";

export function defaultRenderStart(Component, ssr, element, props) {
  if (element) {
    if (ssr) {
      hydrate(<Component {...props} />, element);
    } else {
      render(<Component {...props} />, element);
    }
  } else {
    return <Component {...props} />;
  }
}
