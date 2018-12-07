import React from "react";
import App from "../../src/client/app";
import { renderToString } from "react-dom/server";

describe("test app", function() {
  it("should be able to render React element to string", () => {
    const html = renderToString(<App />);
    console.log(html);
  });

  it.skip("should skip me", () => {});
});
