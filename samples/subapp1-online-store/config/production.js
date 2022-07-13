module.exports = {
  plugins: {
    "subapp-server": {
      options: {
        insertTokenIds: false,
        cdn: { enable: true }
      }
    }
  }
};
