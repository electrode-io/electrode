module.exports = {
  cache: {
    cacheId: "electrode",
    staticFileGlobs: [
      "dist/js/*.{js,css,png,jpg,svg}"
    ],
    stripPrefix: "dist/js/",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    importScripts: ['./sw-events.js']
  },
  manifest: {
    title: "Electrode",
    logo: "./images/electrode.png",
    gcm_sender_id: "432576648327",
    theme_color: "#FFFFFF"
  }
}
