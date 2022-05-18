//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//

import { createDynamicComponent, React, ReactSubApp } from "@xarc/react";
import { reduxFeature, connect } from "@xarc/react-redux";
import { products as data } from "./data";
import { ProductsProps } from "./type";
export { reduxReducers } from "./reducers";

export const Product = createDynamicComponent(
  {
    name: "product",
    getModule: () => import("./product"),
  },
  { ssr: true }
);

const Products: React.FunctionComponent<ProductsProps> = ({ products, dispatch }) => {
  const fetchProducts = () => {
    return {
      type: "PRODUCTS_FETCHED",
      payload: data,
    };
  };

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (products) {
    return (
      <div
        style={{
          padding: "5px",
          marginTop: "15px",
          border: "solid",
          marginLeft: "15%",
          marginRight: "15%",
          textAlign: "center",
        }}
      >
        <h2>Products</h2>
        {products.map((product, i) => (
          <Product key={`prd_key_${i}`} {...product} />
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { ...state.products };
};

export const subapp: ReactSubApp = {
  Component: connect(mapStateToProps, (dispatch) => ({ dispatch }))(Products),
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true, // true => read the reduxReducers export from this file
      prepare: async (initialState) => {
        return { initialState: initialState || { products: [] } };
      },
    }),
  ],
};
