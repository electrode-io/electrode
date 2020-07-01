/* @jsx createElement */

const { IndexPage, createElement, Token, Require } = require("../../lib/jsx");

const Test = (props, context) => {
  context.status = 204;
  return `<div>Hello Test JSX-3</div>`;
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
