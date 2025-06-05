module.exports = {
  extends: "subapp-pkg-util/babelrc.js",
  overrides: [
    {
      test: /\.jsx?$/,
      presets: [
        [
          "@babel/preset-react",
          {
            runtime: "automatic"
          }
        ]
      ]
    }
  ]
};
