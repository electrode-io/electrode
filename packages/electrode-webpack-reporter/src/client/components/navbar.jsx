import React from "react";
import styles from "../styles/base.css";
import {Link} from "react-router";
import RoutePaths from "../../../lib/route-paths";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    switch (window.location.pathname) {
      case RoutePaths.LEGACY:
        this.state = {mode: "legacy"};
        break;
      default:
        this.state = {mode: "report"};
        break;
    }
  }

  createNavBarItem(item) {
    return (
      <div className={this.state.mode === item ? styles.navbarItemSelected : styles.navbarItem}>
        <Link
          className={styles.navBarItem}
          style={{textDecoration: "none"}}
          to ={`/reporter/${item}`}
          onClick={() => this.setState({mode: item})}
        >
          <h2>{item}</h2>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles.electrodeLogo}>
          <img src="https://raw.githubusercontent.com/electrode-io/electrode-io.github.io/develop/img/electrode-02.png" alt="ElectrodeLogo"/>
        </div>
        {this.createNavBarItem("report")}
        {this.createNavBarItem("legacy")}
      </div>
    );
  }
}

export default NavBar;
