import { declareSubApp, xarcV2 } from "@xarc/react";

export const home = declareSubApp({
  name: "home",
  getModule: () => import("./home")
});

export const staticHome = declareSubApp({
  name: "static",
  getModule: () => import("./static")
});

export const recoilApp = declareSubApp({
  name: "recoilApp",
  getModule: () => import("./recoil-todo-app")
});

export const characterCounterApp = declareSubApp({
  name: "sampleApp",
  getModule: () => import("./recoil-character-counter")
});

xarcV2.debug("app.tsx");
