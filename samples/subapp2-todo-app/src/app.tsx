import { declareSubApp, xarcV2 } from "@xarc/react";

// export const home = declareSubApp({
//   name: "home",
//   getModule: () => import("./home")
// });

// export const Demo2 = declareSubApp({
//   name: "demo2",
//   getModule: () => import("./demo2")
// });

export const Todo = declareSubApp({
  name: "todo",
  getModule: () => import("./todo")
});

xarcV2.debug("app.tsx");
