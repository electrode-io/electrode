import { createDynamicComponent, getContainer } from "../../../src/node";
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

    const html = renderToString(<Component />);
    expect(html).to.equal(
      `<div data-reactroot="">subapp <!-- -->test<!-- --> component loading... </div>`
    );

    await container.get("test")._getModule();

    const html2 = renderToString(<Component />);
    expect(html2).to.equal(`<div data-reactroot="">hello</div>`);
  });
});
