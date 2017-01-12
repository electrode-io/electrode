const request= require('superagent');

const updateStorage = store => next => action => {
  let result = next(action);
  let completeState = store.getState();

  request
  .post("/updateStorage")
  .send(completeState)
  .end( function(err, res) {
    if (err || !res.ok) {
       console.log("Update Storage Error:", err);
    } else {
      console.log("Saved to Storage");
    }
    return result;
  });
}

export default updateStorage;
