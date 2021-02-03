import React from "react";
import ReactDom from "react-dom";
import ReactDomServer from "react-dom/server";
import { SubAppOptions, SubApp, SubAppFeatureFactory, SubAppDef } from "@xarc/subapp";

export type ReactSubApp = SubApp<React.Component | React.FunctionComponent>;

//
// re-exports
//
export * from "@xarc/subapp";
export { React, ReactDom, ReactDomServer };
export { AppContext } from "./app-context";
export { CreateComponentOptions } from "./create-component";
export { Component } from "react";

export * from "./feat-static-props-types";
export * from "./feat-app-context-types";
/**
 * construct a framework feature for the implementation of FrameworkLib passed in
 *
 * @param __FrameWorkLib
 *
 * @returns framework feature
 */
export function __reactFrameworkFeature(factory: () => unknown): SubAppFeatureFactory {
  return {
    id: "framework",
    subId: "react",

    add: (subapp: SubAppDef) => {
      if (!subapp._frameworkFactory) {
        subapp._frameworkFactory = factory;
      }
      return subapp;
    }
  };
}

/**
 * add a feature to subapp options - internal use
 * @param options
 * @param id
 * @param featureProvider
 */
export function __addFeature(
  options: SubAppOptions,
  id: string,
  featureProvider: () => SubAppFeatureFactory
) {
  return options.wantFeatures && options.wantFeatures.find(x => x.id === id)
    ? options
    : {
        ...options,
        wantFeatures: [].concat(options.wantFeatures || [], featureProvider())
      };
}

/**
 * Options to inline a subapp as a component nesting within another subapp
 */
export type SubAppInlineOptions = {
  /** Run SSR on the inlined subapp */
  ssr?: boolean;
};
