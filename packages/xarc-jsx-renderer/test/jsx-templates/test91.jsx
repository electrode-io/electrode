/* @jsx createElement */

import { IndexPage, createElement, Token } from "../../src";

const AsyncError = () => {
  return Promise.resolve().then(() => {
    throw new Error("test JSX tag async error");
  });
};

export default (
  <IndexPage>
    <div>
      <AsyncError />
    </div>
  </IndexPage>
);
