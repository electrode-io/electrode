module.exports = {
  async prepare() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("group-1-a ready");
        resolve({ valueA: 999 });
      }, 10);
    });
  }
};
