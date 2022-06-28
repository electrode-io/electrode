import { createDynamicComponent } from "../../../src/node";
import { getContainer } from "@xarc/subapp";
import { renderToString } from "react-dom/server";

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

    expect(container.getNames()).contains("test");
    expect(Component).to.be.a("function");

    // data-reactroot isn't getting created due to Context.Provider
    // see https://github.com/facebook/react/issues/15012
    const html = renderToString(<Component />);
    expect(html).to.equal(
      `<div>subapp <!-- -->test<!-- --> component loading... </div>`
    );

    await container.get("test")._getModule();

    const html2 = renderToString(<Component />);
    expect(html2).to.equal(`<div>hello</div>`);
  });
});
