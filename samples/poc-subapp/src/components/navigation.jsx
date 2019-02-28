import React from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

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
          <li className={cn}>
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
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">
            Logo
          </a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <NavItem exact={true} to="/">
              Home
            </NavItem>
            <NavItem to="/products">Products</NavItem>
            <NavItem to="/deals">Deals</NavItem>
            <NavItem to="/stores">Stores</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <NavItem to="/account">
              <span className="glyphicon glyphicon-user" /> Your Account
            </NavItem>
            <NavItem to="/cart">
              <span className="glyphicon glyphicon-shopping-cart" /> Cart
            </NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const RouterNavigation = withRouter(Navigation);

export { RouterNavigation as Navigation };
