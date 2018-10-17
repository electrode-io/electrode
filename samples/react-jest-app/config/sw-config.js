module.exports = {
  cache: {
    cacheId: "hapi-app",
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
    title: "hapi-app",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
