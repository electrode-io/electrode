import React from "react";
import { Route } from "react-router";

const stringCb = (location, cb) => cb("failed", null);

const errorCb = (location, cb) => cb(new Error("failed error"), null);

export default (
  <Route path="/test" getIndexRoute={stringCb}/>
);

const ErrorRoute = (
  <Route path="/test" getIndexRoute={errorCb}/>
);

export {ErrorRoute};
