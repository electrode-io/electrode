/* eslint-disable new-cap */

import { createTemplateTags, Token, TokenInvoke, RegisterTokenIds } from "../../src";

import * as custom1 from "../fixtures/custom-1";
import * as tokenHandler from "../fixtures/token-handler";

const subTags2 = createTemplateTags`${RegisterTokenIds(tokenHandler)}
  ${RegisterTokenIds(() => {
    return {
      name: "sub-blah-blah-2",
      tokens: {
        X2: "x2"
      }
    };
  })}
  <div>sub template tags 2${Token("X2")}</div>`;

const subTags = createTemplateTags`${RegisterTokenIds(tokenHandler)}
  ${RegisterTokenIds(() => {
    return {
      name: "sub-blah-blah",
      tokens: {
        X: "x1"
      }
    };
  })}
  <div>sub template tags${Token("X")}${subTags2}</div>`;

export const templateTags = createTemplateTags`<html>
<head>
  ${RegisterTokenIds(tokenHandler)}
  ${RegisterTokenIds(() => {
    return {
      name: "blah-blah",
      tokens: {
        ABC: "ABC",
        "ssr-content": "SSR\n",
        "webapp-header-bundles": () => "header\n"
      }
    };
  })}
  ${RegisterTokenIds(tokenHandler)}
  ${Token("ssr-content")}
  ${Token("webapp-header-bundles")}
  ${Token("webapp-body-bundles")}
  ${Token("PAGE_TITLE")}
  ${Token("prefetch-bundles")}
  ${TokenInvoke(custom1)}
  ${context => {
    return `hello world from function: ${Object.keys(context)}\n`;
  }}
  <script>
    console.log("test");
  </script>
  ${subTags}
  ${Token("meta-tags")}
  ${Token("ABC")}
</head>
</html>`;
