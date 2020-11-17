/* eslint-disable new-cap */

import { createTemplateTags, Token, TokenInvoke, RegisterTokenIds } from "../../src";

function foo() {
  return {
    process() {
      return `foo `;
    }
  };
}

function test() {
  return {
    process() {
      return `test `;
    }
  };
}

const data = [foo, "Bar", test];
export const templateTags = createTemplateTags`
${RegisterTokenIds(() => {
  return {
    Bar() {
      return `from Bar `;
    }
  };
})}
${data.map((x: string | Function) => {
  return typeof x === "string" ? Token(x) : TokenInvoke(x, {});
})}
${["hello", " world"].map((x: string) => x)}
`;
