import { connect } from "react-redux";
import { reduxLoadSubApp } from "subapp-redux";
import reduxReducers from "./reducers";

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
        <p>subapp demo2</p>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        &nbsp;{value}&nbsp;
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </div>
      <p style={{ textAlign: "center" }}>© {new Date().getFullYear()} WalmartLabs</p>
    </div>
  );
};

const mapStateToProps = state => state;

export default reduxLoadSubApp({
  Component: connect(mapStateToProps, dispatch => ({ dispatch }))(Demo2),
  name: "Demo2",
  reduxReducers,
  prepare: ({ initialData }) => {
    return Promise.resolve(initialData || { value: 999 });
  }
});
