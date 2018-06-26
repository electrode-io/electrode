// @flow

import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBarExampleIconMenu from "./AppBarExampleIconMenu";
import BottomNavigationExampleSimple from "./BottomNavigationExampleSimple";
import CardExampleWithAvatar from "./CardExampleWithAvatar";

import styles from "../../src/styles/demo-component.css"; // eslint-disable-line

type Props = {};

type State = {};

export default class DemoComponent extends React.Component<Props, State> {
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

DemoComponent.displayName = "DemoComponent";

DemoComponent.propTypes = {};
