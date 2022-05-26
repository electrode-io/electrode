import { declareSubApp, xarcV2 } from "@xarc/react";

export const Header = declareSubApp({
  name: "header",
  getModule: () => import("./subapps/header"),
});

export const MainBody = declareSubApp({
  name: "main-body",
  getModule: () => import("./subapps/main-body"),
});

export const Footer = declareSubApp({
  name: "footer",
  getModule: () => import("./subapps/footer"),
});

xarcV2.debug("app.tsx");
