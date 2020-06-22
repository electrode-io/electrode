/* @jsx createElement */
"use strict";
import { IndexPage, createElement, Token } from "@xarc/render-context";

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <Token _id="HEAD_INITIALIZE" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Token _id="CRITICAL_CSS" />
        <Token _id="APP_CONFIG_DATA" />
        <Token _id="WEBAPP_HEADER_BUNDLES" />
        <Token _id="REACT_HELMET_SCRIPTS" />
        <Token _id="WEBAPP_DLL_BUNDLES" />
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <div class="js-content">
          <Token _id="SSR_CONTENT" />
        </div>
        <Token _id="AFTER_SSR_CONTENT" />
        <Token _id="PREFETCH_BUNDLES" />
        <Token _id="WEBAPP_BODY_BUNDLES" />
        <Token _id="WEBAPP_START_SCRIPT" />
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
