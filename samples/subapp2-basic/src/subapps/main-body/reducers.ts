const number = (store = { value: 0 }, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1,
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1,
    };
  }

  return store;
};

export const reduxReducers = { number };
