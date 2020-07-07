/* @jsx createElement */

import {
  IndexPage,
  createElement,
  Token,
  Require,
  Literal,
  Component,
  LoadTokenHandler
} from "../../src";

const Template = () => {
  return (
    <IndexPage DOCTYPE="html">
      <LoadTokenHandler
        name="test1"
        handler={() => {
          return {
            FOO: () => "this is a test"
          };
        }}
      />
      <Token _id="FOO" />
      <LoadTokenHandler handler="../fixtures/token-handler" />
      <Token _id="user-token-1" />
      <LoadTokenHandler name="name_with_call" call="handler2" handler="../fixtures/token-handler" />
      {/* Test re-entry */}
      <LoadTokenHandler name="name_with_call" call="handler2" handler="../fixtures/token-handler" />
      <Token _id="TOKEN_HANDLER2" />
    </IndexPage>
  );
};

export default Template;
