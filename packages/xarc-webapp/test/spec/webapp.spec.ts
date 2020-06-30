import { makeRouteHandler } from "../../src/webapp";
import { expect } from "chai";

describe("webapp makeRouteHandler", function () {
  it("parses template files", function () {
    const option = makeRouteHandler({
      templateFile: "../../template/index.jsx"
    });
    option();
    console.log(option);
  });
});
