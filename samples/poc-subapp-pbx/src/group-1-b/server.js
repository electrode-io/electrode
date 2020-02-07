module.exports = {
  async prepare() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("group-1-b ready");
        resolve({ valueB: 111 });
      }, 500);
    });
  }
};
