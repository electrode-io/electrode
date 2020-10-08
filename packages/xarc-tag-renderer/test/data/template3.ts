/* eslint-disable new-cap */

import { createTemplateTags, Token, TokenInvoke, RegisterTokenIds } from "../../src";
import * as tokenHandler from "../fixtures/token-handler";

import * as custom1 from "../fixtures/custom-1";

const nullTokenProcess = () => {
  return null;
};

const subTags2 = createTemplateTags`${RegisterTokenIds(tokenHandler)}
  ${RegisterTokenIds(() => {
    return {
      name: "sub-blah-blah-2",
      tokens: {
        X2: "x2"
      }
    };
  })}
  <div>sub template tags 2${TokenInvoke(custom1)}${Token("X2")}</div>`;

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
  ${Token("ssr-content")}
  ${Token("webapp-header-bundles")}
  ${Token("webapp-body-bundles")}
  ${Token("prefetch-bundles")}
  ${RegisterTokenIds(() => {
    return {
      NULL_ID: null
    };
  })}
  ${Token("NULL_ID")}
  <div>test null id</div>
  <script>
    console.log("test")
  </script>
  ${TokenInvoke(custom1)}
  ${Token("webapp-body-bundles")}
  ${Token("meta-tags")}
  ${TokenInvoke(nullTokenProcess)}
  <div>subTags</div>${() => subTags}<div>subTags</div>
  <div>subTagsPromise</div>
  ${() => Promise.resolve(subTags)}<div>subTagsPromise</div>
</head>
</html>
${Token("page-title")}
`;
