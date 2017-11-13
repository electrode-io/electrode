"use strict";

const React = require("react");
const PropTypes = require("prop-types");
const ReactDOMServer = require("react-dom/server");
const contextProvider = require("../../lib/context-provider");

describe("contextProvider", () => {
  it("exposes the app in React context", () => {
    class Test extends React.Component {
      render() {
        return React.createElement("div", null, this.context.app.name);
      }
    }

    Test.contextTypes = {
      app: PropTypes.object
    };

    const rendered = ReactDOMServer.renderToStaticMarkup(
      React.createElement(contextProvider(Test, {name: "walmart"})));

    expect(rendered).to.equal("<div>walmart</div>");
  });
});
