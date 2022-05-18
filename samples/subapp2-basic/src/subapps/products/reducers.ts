const products = (store = { products: [] }, action) => {
  if (action.type === "PRODUCTS_FETCHED") {
    return {
      products: action.payload,
    };
  }
  return store;
};

export const reduxReducers = {
  products,
};
