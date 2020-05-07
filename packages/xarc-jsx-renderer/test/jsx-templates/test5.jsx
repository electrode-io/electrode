/* @jsx createElement */

import { IndexPage, createElement, Require, Token } from "../../src";

export default (
  <IndexPage>
    <Require _id="./test-token" name="require1" />
    <Require _id="./test-token" name="require2" />
    <Require _id="./test-token" name="require3" />
    <Token _id="TEST_MEMOIZE" />
  </IndexPage>
);
