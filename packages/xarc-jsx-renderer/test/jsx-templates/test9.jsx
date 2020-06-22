/* @jsx createElement */

import { IndexPage, createElement, Token } from "../../src";

const SyncError = () => {
  throw new Error("test JSX tag sync error");
};

export default (
  <IndexPage>
    <div>
      <SyncError />
    </div>
  </IndexPage>
);
