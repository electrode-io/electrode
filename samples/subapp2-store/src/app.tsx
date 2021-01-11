import { declareSubApp, xarcV2 } from "@xarc/react";


export const header = declareSubApp({
  name: "header",
  getModule: () => import("./header/app-header")
});

export const home = declareSubApp({
  name: "home",
  getModule: () => import("./home")
});

export const bottom = declareSubApp({
  name: "bottom",
  getModule: () => import("./subapps/03.bottom/bottom")
})

export const extras = declareSubApp({
  name: "extras",
  getModule: () => import("./05.extras/app-extras")
})

export const footer = declareSubApp({
  name: "footer",
  getModule: () => import("./04.footer/app-footer")
})

export const staticHome = declareSubApp({
  name: "static",
  getModule: () => import("./static")
});

xarcV2.debug("app.tsx");
