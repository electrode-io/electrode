import { React } from "@xarc/react";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";
import custom from "../styles/bootstrap.css";

const NavItem = props => {
  const { to, exact, strict, children } = props;
  return (
    <Route
      path={to}
      exact={exact}
      strict={strict}
      children={({ location, match }) => {
        const cn = match ? "active" : null;
        return (
          <li className={custom[cn]}>
            <Link to={to}>
              <div>{children}</div>
            </Link>
          </li>
        );
      }}
    />
  );
};

const Navigation = () => {
  return (
    <nav className={classNames(custom.navbar, custom["navbar-inverse"])}>
      <div className={custom["container-fluid"]}>
        <div className={custom["navbar-header"]}>
          <button
            type="button"
            className={custom["navbar-toggle"]}
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className={custom["icon-bar"]} />
            <span className={custom["icon-bar"]} />
            <span className={custom["icon-bar"]} />
          </button>
          <a className={custom["navbar-brand"]} href="#">
            Logo
          </a>
        </div>
        <div className={classNames(custom.collapse, custom["navbar-collapse"])} id="myNavbar">
          <ul className={classNames(custom.nav, custom["navbar-nav"])}>
            <NavItem exact={true} to="/">
              Home
            </NavItem>
            <NavItem to="/products">Products</NavItem>
            <NavItem to="/stores">Stores</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </ul>
          <ul className={classNames(custom.nav, custom["navbar-nav"], custom["navbar-right"])}>
            <NavItem to="/account">
              <span className={classNames(custom.glyphicon, custom["glyphicon-user"])} /> Your
              Account
            </NavItem>
            <NavItem to="/cart">
              <span className={classNames(custom.glyphicon, custom["glyphicon-shopping-cart"])} />{" "}
              Cart
            </NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//const RouterNavigation = withRouter(Navigation);

export { Navigation };
