module.exports = {
  async prepare() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({});
      }, 100);
    });
  }
};
