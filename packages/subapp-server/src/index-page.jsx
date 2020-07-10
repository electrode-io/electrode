/* @jsx createElement */

import { IndexPage, createElement, Token, Require, LoadTokenHandler } from "@xarc/jsx-renderer";
import { ReserveSpot } from "subapp-web";

const RenderSubApps = (props, context) => {
  const { routeOptions } = context.user;
  const { subApps } = routeOptions.__internals;

  return (
    subApps &&
    subApps.length > 0 &&
    createElement(
      "div",
      null,
      ...subApps.map((info, ix) => {
        const { subapp, options } = info;
        const elementId = props.inline ? undefined : `subapp-${subapp.name}-${ix}`;

        return createElement(
          Require,
          Object.assign(
            {
              _concurrent: true,
              elementId,
              timestamp: true,
              useStream: false,
              async: true,
              serverSideRendering: true
            },
            options,
            {
              _id: "subapp-web/lib/load",
              name: subapp.name
            }
          )
        );
      })
    )
  );
};

const Template = (
  <IndexPage DOCTYPE="html">
    <LoadTokenHandler handler="@xarc/index-page" call="tokenHandler" />
    <Token _id="INITIALIZE" />
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ReserveSpot saveId="headEntries" />
        <Require _id="subapp-web/lib/polyfill" />
        <Token _id="META_TAGS" />
        <Token _id="PAGE_TITLE" />
        <Require _id="subapp-web/lib/init" />

        <Token _id="CRITICAL_CSS" />
      </head>
      <Token _id="HEAD_CLOSED" />
      <body>
        <noscript>
          <h4>JavaScript is Disabled</h4>
          <p>Sorry, this webpage requires JavaScript to function correctly.</p>
          <p>Please enable JavaScript in your browser and reload the page.</p>
        </noscript>
        <RenderSubApps />
        <Require _id="subapp-web/lib/start" />
      </body>
      <Token _id="BODY_CLOSED" />
    </html>
    <Token _id="HTML_CLOSED" />
  </IndexPage>
);

export default Template;
