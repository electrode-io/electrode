/* @jsx createElement */

import {
  IndexPage,
  createElement,
  Token,
  Require,
  Literal,
  Component,
  RegisterTokenIds,
  xarcJsxElement
} from "../../src";

const Template = () => {
  return (
    <IndexPage DOCTYPE="html">
      <RegisterTokenIds
        name="test1"
        handler={() => {
          return {
            FOO: () => "this is a test"
          };
        }}
      />
      <Token _id="FOO" />
      <RegisterTokenIds handler="../fixtures/token-handler" />
      <Token _id="user-token-1" />
      <RegisterTokenIds name="name_with_call" call="handler2" handler="../fixtures/token-handler" />
      {/* Test re-entry */}
      <RegisterTokenIds name="name_with_call" call="handler2" handler="../fixtures/token-handler" />
      <Token _id="TOKEN_HANDLER2" />
    </IndexPage>
  );
};

Template.$$typeof = xarcJsxElement;
export default Template;
