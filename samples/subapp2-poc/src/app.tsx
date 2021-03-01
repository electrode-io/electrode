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
  getModule: () => import("./recoilTodo")
});

xarcV2.debug("app.tsx");
