module.exports = {
  cache: {
    cacheId: "demo-tree-shaking",
    runtimeCaching: [
      {
        handler: "fastest",
        urlPattern: "/$"
      }
    ],
    staticFileGlobs: ["dist/**/*"]
  },
  manifest: {
    background: "#FFFFFF",
    title: "demo-tree-shaking",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
