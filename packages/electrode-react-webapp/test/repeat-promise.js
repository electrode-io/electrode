const Promise = require("bluebird");

const promise = new Promise(resolve => {
  console.log("resolving!");
  resolve(5);
});

Promise.each(
  [1, 2, 3],
  () => {
    console.log("loop");
    return promise;
  },
  () => {}
);
