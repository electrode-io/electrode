import { declareSubApp, xarcV2 } from "@xarc/react";

export const Header = declareSubApp({
  name: "header",
  getModule: () => import("./subapps/header"),
});

export const Home = declareSubApp({
  name: "home",
  getModule: () => import("./subapps/home"),
});

export const Products = declareSubApp({
  name: "products",
  getModule: () => import("./subapps/products"),
});

export const Footer = declareSubApp({
  name: "footer",
  getModule: () => import("./subapps/footer"),
});

xarcV2.debug("app.tsx");
