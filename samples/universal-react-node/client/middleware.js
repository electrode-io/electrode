require('es6-promise').polyfill();
require('isomorphic-fetch');

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
  .then( function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return result;
  })
};

export default updateStorage;
