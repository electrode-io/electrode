/* @jsx createElement */

const { IndexPage, createElement, Token } = require("../../lib/jsx"); // eslint-disable-line

// eslint-disable-next-line
const TestAsync = async () => {
  return `<div>Hello from async tag JSX-2</div>`;
};

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html blah="blah foo">
      <head>
        <Token _id="HEAD_INITIALIZE" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Token _id="INITIALIZE_HELMET" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Token _id="CRITICAL_CSS" />
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <div>test jsx-2</div>
        <div class="js-content">
          <Token _id="SSR_CONTENT" />
        </div>
        <Token _id="PREFETCH_BUNDLES" />
        <Token _id="WEBAPP_BODY_BUNDLES" />
        <TestAsync />
        <script>if (window.webappStart) webappStart();</script>
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>
      </body>
    </html>
  </IndexPage>
);

export default Template;
