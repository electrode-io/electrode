import { declareSubApp, xarcV2 } from "@xarc/react";

export const home = declareSubApp({
  name: "home",
  getModule: () => import("./home")
});

export const Demo2 = declareSubApp({
  name: "demo2",
  getModule: () => import("./demo2")
});

export const Demo3 = declareSubApp({
  name: "demo3",
  getModule: () => import("./demo3")
});

xarcV2.debug("app.tsx");
