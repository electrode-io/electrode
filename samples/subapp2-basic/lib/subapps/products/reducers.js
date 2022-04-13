"use strict";

exports.__esModule = true;
exports.reduxReducers = void 0;

const products = (store = {
  products: []
}, action) => {
  if (action.type === "PRODUCTS_FETCHED") {
    return {
      products: action.payload
    };
  }

  return store;
};

const reduxReducers = {
  products
};
exports.reduxReducers = reduxReducers;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9kdWN0cyIsInN0b3JlIiwiYWN0aW9uIiwidHlwZSIsInBheWxvYWQiLCJyZWR1eFJlZHVjZXJzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N1YmFwcHMvcHJvZHVjdHMvcmVkdWNlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvZHVjdHMgPSAoc3RvcmUgPSB7IHByb2R1Y3RzOiBbXSB9LCBhY3Rpb24pID0+IHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSBcIlBST0RVQ1RTX0ZFVENIRURcIikge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9kdWN0czogYWN0aW9uLnBheWxvYWQsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gc3RvcmU7XG59O1xuXG5leHBvcnQgY29uc3QgcmVkdXhSZWR1Y2VycyA9IHtcbiAgcHJvZHVjdHMsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU1BLFFBQVEsR0FBRyxDQUFDQyxLQUFLLEdBQUc7RUFBRUQsUUFBUSxFQUFFO0FBQVosQ0FBVCxFQUEyQkUsTUFBM0IsS0FBc0M7RUFDckQsSUFBSUEsTUFBTSxDQUFDQyxJQUFQLEtBQWdCLGtCQUFwQixFQUF3QztJQUN0QyxPQUFPO01BQ0xILFFBQVEsRUFBRUUsTUFBTSxDQUFDRTtJQURaLENBQVA7RUFHRDs7RUFDRCxPQUFPSCxLQUFQO0FBQ0QsQ0FQRDs7QUFTTyxNQUFNSSxhQUFhLEdBQUc7RUFDM0JMO0FBRDJCLENBQXRCIn0=