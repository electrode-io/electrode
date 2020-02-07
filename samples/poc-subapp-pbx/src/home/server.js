module.exports = {
  async prepare() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ valueA: 111, valueB: 999 });
      }, 500);
    });
  }
};
