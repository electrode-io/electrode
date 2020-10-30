module.exports = {
  presets: [
    [
      "minify",
      {
        removeDebugger: true,
        removeConsole: { exclude: ["error", "warn"] }
      }
    ]
  ],
  plugins: ["transform-remove-strict-mode"]
};
