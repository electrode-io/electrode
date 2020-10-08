/* @jsx createElement */

const { IndexPage, createElement, Token, Require } = require("../../lib/jsx"); // eslint-disable-line

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html blah="blah foo">
      <head>
        <Token _id="HEAD_INITIALIZE" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Token _id="CRITICAL_CSS" />
        <Token _id="APP_CONFIG_DATA" />
        <Token _id="WEBAPP_HEADER_BUNDLES" />
        <Token _id="WEBAPP_DLL_BUNDLES" />
        <Token _id="user-header-token" />
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <div>test html-1</div>
        <Token _id="user-spot-token" />
        <div class="js-content">
          <Token _id="user-token-unhandled" />
          <Token _id="SSR_CONTENT" />
        </div>
        <Token _id="AFTER_SSR_CONTENT" />
        <Token _id="PREFETCH_BUNDLES" />
        <Token _id="user-promise-token" />
        <Token _id="WEBAPP_BODY_BUNDLES" />
        <Token _id="WEBAPP_START_SCRIPT" />
        <Require _id="../fixtures/custom-1" />
        <Token _id="user-token-1" />
        <Token _id="user-token-2" />
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>
      </body>
      <Token _id="BODY_CLOSED" />
    </html>
  </IndexPage>
);

export default Template;
