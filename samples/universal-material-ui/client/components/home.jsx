import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export class Home extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1>Hello <a href="https://github.com/electrode-io">Electrode</a></h1>
          <a href="http://www.material-ui.com">material-ui</a> RaisedButto component: <RaisedButton label="Default"/>
        </div>
      </MuiThemeProvider>
    );
  }
}
