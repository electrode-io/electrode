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
    logo: "./images/electrode.png",
    gcm_sender_id: "432576648327",
    theme_color: "#FFFFFF"
  }
}