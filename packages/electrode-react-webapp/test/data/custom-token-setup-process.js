let setupToken;

module.exports = {
  setup: (renderContext, token) => {
    setupToken = token;
  },
  process: () => {
    return setupToken;
  }
};
