import { React } from "subapp-react";
import { reduxLoadSubApp } from "subapp-redux";
import { connect } from "react-redux";

const email = (email = "", action = {}) => {
  if (action.type === "EMAIL") {
    return action.payload;
  }
  return email;
};

const setEmail = (value) => {
  return {
    type: "EMAIL",
    payload: value,
  };
};

const reducers = { email };

const Footer = (props) => {
  const onSubmit = () => {
    const email = document.getElementById("email").value;
    props.dispatch(setEmail(email));
    return true;
  };

  return (
    <footer className="text-center">
      <form>
        <h4>Redux State Change Demo</h4>        
        <input
          type="email"
          id="email"
          className="form-control"
          size="50"
          placeholder="Email Address, no validation"
        />
        <br />
        <button type="button" className="btn btn-danger" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </footer>
  );
};

const Component = connect(
  (state) => state,
  (dispatch) => ({ dispatch })
)(Footer);

export default reduxLoadSubApp({
  name: "Footer",
  Component,
  reduxShareStore: true,
  reduxReducers: reducers,
  prepare: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: "Online Store Copyright",
        });
      }, 2000);
    });
  },
});
