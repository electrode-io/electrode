/* eslint-env browser */
// import * as React from "react";
// import { render, hydrate } from "react-dom";
// import { Provider } from "react-redux";
import { setStoreContainer } from "../common/redux-shared-store";

setStoreContainer(window);

export * from "../common";
