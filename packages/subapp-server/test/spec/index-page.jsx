/* @jsx createElement */

import { IndexPage, createElement, Token, Require, RegisterTokenIds } from "@xarc/jsx-renderer";
import { tokenHandler } from "@xarc/index-page";

const Template = (
  <IndexPage DOCTYPE="html">
    <RegisterTokenIds handler={tokenHandler} />
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>
        <h1>Hello World!!!</h1>
        <Require _id="subapp-web/lib/start" />
      </body>
      <Token _id="BODY_CLOSED" />
    </html>
    <Token _id="HTML_CLOSED" />
  </IndexPage>
);

export default Template;
