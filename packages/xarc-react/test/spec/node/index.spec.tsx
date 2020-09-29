import { createDynamicComponent, getContainer, SSRReactLib } from "../../../src/node/index";
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

    const ssrLib = new SSRReactLib();

    const html = ssrLib.renderToString(<Component />);
    expect(html).to.equal(`<div data-reactroot="">subapp component loading... </div>`);

    await container.test._getModule();

    const html2 = ssrLib.renderToString(<Component />);
    expect(html2).to.equal(`<div data-reactroot="">hello</div>`);
  });
});
