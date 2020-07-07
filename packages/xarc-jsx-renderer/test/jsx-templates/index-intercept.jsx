/* @jsx createElement */

const { IndexPage, createElement, Token } = require("../../src");

const Test = (props, context) => {
  context.intercept({
    responseHandler: (request, h) => {
      return h.response("context intercept handler").takeover();
    }
  });
};

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html blah="blah foo">
      <head>
        <Token _id="HEAD_INITIALIZE" />
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <Test />
      </body>
    </html>
  </IndexPage>
);

export default Template;
