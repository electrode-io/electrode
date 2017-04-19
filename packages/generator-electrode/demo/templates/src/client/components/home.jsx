import React from "react";
import { connect } from "react-redux";

import "<%= className %>" from "<%= packageName %>";

export class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Some content in same parent div as</p>
        < <%= packageName %> />
      </div>
    );
  }
}

export default connect((state) => state)(Home);
