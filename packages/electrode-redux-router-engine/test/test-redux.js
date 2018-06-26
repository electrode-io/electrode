"use strict";

module.exports = options => {
  const name = options.route.name;
  return {
    reducer: {
      [name]: (state, action) => {
        if (action.type === "INC_NUMBER") {
          return state + 1;
        }

        return state || 0;
      }
    },
    initialState: {
      [name]: 51
    }
  };
};
