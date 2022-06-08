/* @jsx createElement */

import { IndexPage, createElement, Token, Require, Literal } from "subapp-server/template";

const Template = (
  <IndexPage DOCTYPE="html">
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        />
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

        <div class="container">
          <Require
            _id="subapp-web/lib/load"
            name="Header"
            _concurrent
            timestamp
            startOnLoad
            elementId="subapp-header01"
            serverSideRendering
            inlineScript
          />
      
          <Require
            _id="subapp-web/lib/load"
            _concurrent
            name="MainBody"
            timestamp
            startOnLoad
            elementId="subapp-mainbody"
            useStream
            async
            hydrateServerData
            serverSideRendering
          />    

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-footer"
          name="Footer"
          async
          serverSideRendering
        />

        <Require
          _id="subapp-web/lib/load"
          _concurrent
          timestamp
          elementId="subapp-suspense-demo"
          name="SuspenseDemo"            
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
