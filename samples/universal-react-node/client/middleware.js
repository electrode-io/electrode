require("es6-promise").polyfill();
require("isomorphic-fetch");
const HTTP_BAD_REQUEST = 400;

const updateStorage = (store) => (next) => (action) => {
  const result = next(action);
  const completeState = store.getState();

  fetch("/updateStorage", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(completeState)
  })
  .then((response) => {
    if (response.status >= HTTP_BAD_REQUEST) {
      throw new Error("Bad response from server");
    }
    return result;
  });
};

export default updateStorage;
