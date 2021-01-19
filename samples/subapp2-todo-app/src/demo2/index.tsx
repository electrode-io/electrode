//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//

import { React, ReactSubApp } from "@xarc/react";
import { reduxFeature, connect } from "@xarc/react-redux";
export { reduxReducers } from "./reducers";

const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Demo2 = props => {
  const { value, dispatch } = props;

  return (
    <div>
      <div
        style={{
          padding: "5px",
          marginTop: "15px",
          border: "solid",
          marginLeft: "15%",
          marginRight: "15%"
        }}
      >
        <h2>subapp demo2 with Redux</h2>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        &nbsp;{value}&nbsp;
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </div>
      <p style={{ textAlign: "center" }}>© {new Date().getFullYear()} Your (Company) name here</p>
    </div>
  );
};

const mapStateToProps = state => {
  return { value: state.number.value };
};

export const subapp: ReactSubApp = {
  Component: connect(mapStateToProps, dispatch => ({ dispatch }))(Demo2),
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true, // true => read the reduxReducers export from this file
      prepare: async initialState => {
        return { initialState: initialState || { number: { value: 999 } } };
      }
    })
  ]
};
