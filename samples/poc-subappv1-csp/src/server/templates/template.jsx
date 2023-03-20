/* @jsx createElement */
import {
    IndexPage,
    createElement,
    Token,
    Require,
    RegisterTokenIds,
  } from "subapp-server/template"
  
  import { ReserveSpot } from "subapp-web"
  import { tokenHandler } from "@xarc/index-page"
  
  const Template = (props) => (
    <IndexPage DOCTYPE="html">
      <RegisterTokenIds handler={tokenHandler} />
      <Token _id="INITIALIZE" />
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <ReserveSpot saveId="headEntries" />
          <Token _id="META_TAGS" />
          <Token _id="PAGE_TITLE" />
          <Require _id="subapp-web/lib/init" />
          <Token _id="CUSTOM_TOKEN_HANDLER" />
          <Token _id="CRITICAL_CSS" />
        </head>
        <Token _id="HEAD_CLOSED" />
        <body>
          <noscript>
            <h4>JavaScript is Disabled</h4>
            <p>Please enable JavaScript in your browser and reload the page.</p>
          </noscript>
          <div style="position:relative; min-height: 100vh">
            {props.children}
            <Require _id="subapp-web/lib/start" />
          </div>
        </body>
        <Token _id="BODY_CLOSED" />
      </html>
      <Token _id="HTML_CLOSED" />
    </IndexPage>
  )
  
  export default Template
  