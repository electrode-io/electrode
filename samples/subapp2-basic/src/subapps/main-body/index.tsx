//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//

import { createDynamicComponent, React, ReactSubApp } from "@xarc/react";
import { reduxFeature, connect } from "@xarc/react-redux";
import { reactRouterFeature, Route, Routes } from "@xarc/react-router";
import Home from "../../components/Home";

export { reduxReducers } from "./reducers";

const incNumber = () => {
  return {
    type: "INC_NUMBER",
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER",
  };
};

export const Products = createDynamicComponent(
  {
    name: "Products",
    getModule: () => import("../../components/products"),
  },
  { ssr: true }
);

const MainBody = (props) => {
  const { value, dispatch } = props;

  return (
    <div>
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
        <h2>Body subApp with Redux State Demo</h2>
        <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        &nbsp;{value}&nbsp;
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>      
    </div>
  );
};

const mapStateToProps = (state) => {
  return { value: state.number.value };
};

export const subapp: ReactSubApp = {
  Component: connect(mapStateToProps, (dispatch) => ({ dispatch }))(MainBody),
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true, // true => read the reduxReducers export from this file
      prepare: async (initialState) => {
        return { initialState: initialState || { number: { value: 999 } } };
      },
    }), reactRouterFeature({ React })
  ],
};
