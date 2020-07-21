"use strict";

/* eslint-disable new-cap */

const {
  createTemplateTags,
  createTemplateTagsFromArray,
  Token,
  TokenInvoke,
  RegisterTokenIds
} = require("@xarc/tag-renderer");

const { tokenHandler } = require("@xarc/index-page");
const { ReserveSpot } = require("subapp-web");
const subappWebPolyfill = require("subapp-web/lib/polyfill");
const subappWebLoad = require("subapp-web/lib/load");
const subappWebInit = require("subapp-web/lib/init");
const subappWebStart = require("subapp-web/lib/start");

const RenderSubApps = context => {
  const { routeOptions } = context.user;
  const { subApps } = routeOptions.__internals;

  if (subApps && subApps.length > 0) {
    return createTemplateTagsFromArray(
      subApps.map((info, ix) => {
        const { subapp, options } = info;
        const elementId = `subapp-${subapp.name}-${ix}`;

        return TokenInvoke(
          subappWebLoad,
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
            { name: subapp.name }
          )
        );
      })
    );
  }

  return null;
};

exports.templateTags = createTemplateTags`<!doctype html>
${RegisterTokenIds(tokenHandler)}
${Token("INITIALIZE")}
<html><head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${TokenInvoke(subappWebInit)}
    ${context => ReserveSpot({ saveId: "headEntries" }, context)}
    ${TokenInvoke(subappWebPolyfill)}
    ${Token("META_TAGS")}
    ${Token("PAGE_TITLE")}
    ${Token("CRITICAL_CSS")}
</head><body>
    <noscript>
        <h4>JavaScript is Disabled</h4>
        <p>Sorry, this webpage requires JavaScript to function correctly.</p>
        <p>Please enable JavaScript in your browser and reload the page.</p>
    </noscript>
    ${RenderSubApps}
    ${TokenInvoke(subappWebStart)}
</body><html>`;
