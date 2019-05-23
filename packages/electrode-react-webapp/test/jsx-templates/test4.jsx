/* @jsx createElement */

import { IndexPage, createElement, Require } from "../../lib/jsx";
import Path from "path";

export default (
  <IndexPage>
    <Require _id={Path.join(__dirname, "test-token")} name="require1" />
    <Require _id={Path.join(__dirname, "test-token")} name="require2" />
    <Require _id={Path.join(__dirname, "test-token")} name="require3" />
  </IndexPage>
);
