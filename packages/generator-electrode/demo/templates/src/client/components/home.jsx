import React from "react";
import { connect } from "react-redux";
import { Spinner } from "@walmart/wmreact-spinner";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Some content in same parent div as</p>
        < Spinner />
      </div>
    );
  }
}

export default connect((state) => state)(Home);
