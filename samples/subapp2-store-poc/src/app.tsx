import { declareSubApp, xarcV2 } from "@xarc/react";

export const home = declareSubApp({
  name: "home",
  getModule: () => import("./home")
});

export const staticHome = declareSubApp({
  name: "static",
  getModule: () => import("./static")
});

xarcV2.debug("app.tsx");
