import { createDynamicComponent, getContainer } from "../../../src/browser/index";
import { describe, it } from "mocha";
import { expect } from "chai";

import { createElement } from "react"; // eslint-disable-line

describe("createDynamicComponent", function () {
  it("should create a component from a subapp", async () => {
    const container = getContainer();

    const Component = createDynamicComponent({
      name: "test",
      getModule: () => import("../../blah")
    });

    expect(container).to.have.key("test");
    expect(Component).to.be.a("function");
  });
});
