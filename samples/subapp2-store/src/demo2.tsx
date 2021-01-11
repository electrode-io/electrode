import { React, ReactSubApp } from "@xarc/react";
import { connect } from "@xarc/react-redux";

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

  const { dispatch } = props;
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>abc subapp demo2</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="https://www.electrode.io/electrode/">Electrode Docs</a>
      </p>
      <p>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        <input style={{ textAlign: "center" }} readOnly size="6" value={props.value} />
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return { value: state.number.value };
};

const ReduxDemo2 = connect(mapStateToProps, dispatch => ({ dispatch }))(Demo2);

export { ReduxDemo2 as Component };


export const subapp: ReactSubApp = {
  Component: ReduxDemo2
};
