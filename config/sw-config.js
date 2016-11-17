module.exports = {
  cache: {
    cacheId: "electrode",
    staticFileGlobs: [
      "dist/js/*.{js,css,png,jpg,svg}",
      "dist/js/icons**/*.png"
    ],
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }]
  },
  manifest: {
    title: "Electrode",
    logo: "./images/electrode.png"
  }
}