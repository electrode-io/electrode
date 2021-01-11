import { declareSubApp, xarcV2 } from "@xarc/react";

export const header = declareSubApp({
  name: "header",
  getModule: () => import("./subapps/header")
});

export const main = declareSubApp({
  name: "main",
  getModule: () => import("./subapps/main-body")
});

export const bottom = declareSubApp({
  name: "bottom",
  getModule: () => import("./subapps/bottom")
});

export const extras = declareSubApp({
  name: "extras",
  getModule: () => import("./subapps/extras")
});

export const footer = declareSubApp({
  name: "footer",
  getModule: () => import("./subapps/footer")
});

xarcV2.debug("app.tsx");
