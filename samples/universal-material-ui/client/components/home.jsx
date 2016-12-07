import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBarExampleIconMenu from "./AppBarExampleIconMenu";
import BottomNavigationExampleSimple from "./BottomNavigationExampleSimple";
import CardExampleWithAvatar from "./CardExampleWithAvatar";

export class Home extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBarExampleIconMenu />
          <CardExampleWithAvatar />
          <BottomNavigationExampleSimple />
        </div>
      </MuiThemeProvider>
    );
  }
}
