import { React } from "subapp-react";
import { reduxLoadSubApp } from "subapp-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const email = (email = '', action = {}) => {
  if (action.type === "EMAIL") {
    return action.payload;
  }
  return email;
};

const setEmail = (value) => {
  return {
    type: 'EMAIL',
    payload: value
  };
};

const reducers = {email};

const Footer = props => {

  const onSubmit = () => {
    const email = document.getElementById("email").value;
    props.dispatch(setEmail(email));
    return true;
  };

  return (
    <footer className="container-fluid text-center">
      <h4>Redux state change demo in a subApp</h4>
      Footer is a subApp. Click "Submit" to see Redux state change in browser console.
      <input type="email" id="email" className="form-control" size="50" placeholder="Email Address, no validation" />
      <button type="button" className="btn btn-danger" onClick={onSubmit}>
        Submit
      </button>
    </footer>
  );
};

Footer.propTypes = {
  title: PropTypes.string
};

const Component = connect(
  state => state,
  dispatch => ({ dispatch })
)(Footer);

export default reduxLoadSubApp({
  name: "Footer",
  Component,
  reduxShareStore: true,
  reduxReducers: reducers,
  prepare: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: "Online Store Copyright"
        });
      }, 2000);
    });
  }
});
