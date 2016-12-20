/*eslint-disable react/prop-types*/
import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {warningsErrorsStyles as styles} from "../styles/inline-styles";

export default class CodeExpandButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {codeExpanded: false};
  }
  render() {
    return (<RaisedButton
      onClick={ () => this.setState({codeExpanded: !this.state.codeExpanded}) }
      label={this.state.codeExpanded ? "Hide" : "Show the code"}
      style={styles().expandCodeButton}
      backgroundColor="white"
      labelColor="black"
      expander={true} />);
  }
}
