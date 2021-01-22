import { declareSubApp, xarcV2 } from "@xarc/react";

export const Todo = declareSubApp({
  name: "todo",
  getModule: () => import("./todo")
});

xarcV2.debug("app.tsx");
