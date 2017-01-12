const request = require("superagent");

const updateStorage = (store) => (next) => (action) => {
  const result = next(action);
  const completeState = store.getState();

  request
  .post("/updateStorage")
  .send(completeState)
  .end((err, res) => {
    if (err || !res.ok) {
      throw err;
    }
    return result;
  });
};

export default updateStorage;
