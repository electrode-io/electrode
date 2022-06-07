/* @jsx createElement */

import { IndexPage, createElement, Token, Require, Literal } from "subapp-server/template";

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
        crossorigin="anonymous" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Require _id="subapp-web/lib/init" />

        <Token _id="CRITICAL_CSS" />

        <style>
          <Literal file={`${__dirname}/style.css`} />
        </style>
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>

        <h1 style="text-align: center; background: #143F6B; margin:0;color: white; padding: 20px;">
          React v18 based SubApp Version 1 with React v18
        </h1>

        <div style="background: #F55353; padding: 10px">
          <Require
            _id="subapp-web/lib/load"
            name="Demo1"
            _concurrent
            timestamp
            startOnLoad
            elementId="subapp-demo1"
            serverSideRendering
            inlineScript
          />
        </div>

        <div style="background: #FEB139; padding: 10px">
          <Require
            _id="subapp-web/lib/load"
            _concurrent
            name="Demo2"
            timestamp
            elementId="subapp-demo2"
            async
            useStream
            serverSideRendering
          />
        </div>

        <div style="background: #F6F54D; padding: 10px">
          <Require
            _id="subapp-web/lib/load"
            name="Demo3"
            _concurrent
            timestamp
            elementId="subapp-demo3"
            async
            useStream
            serverSideRendering
          />
        </div>

        <Require _id="subapp-web/lib/start" />
      </body>
      <Token _id="BODY_CLOSED" />
    </html>
    <Token _id="HTML_CLOSED" />
  </IndexPage>
);

export default Template;
