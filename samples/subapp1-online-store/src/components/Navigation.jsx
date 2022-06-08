import React from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import electrodePng from "../../static/electrode.png";

const NavItem = props => {
  const { to, exact, strict, children } = props;
  return (
    <Route
      path={to}
      exact={exact}
      strict={strict}
      children={({ location, match }) => {
        const cn = match ? "active" : "";
        return (
          <li className={`nav-item ${cn}`}>
            <Link className="nav-link" to={to}>{children}</Link>
          </li>
        );
      }}
    />
  );
};

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={electrodePng} />  
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavItem exact={true} to="/">Home</NavItem>
            <NavItem to="/products">Products</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const RouterNavigation = withRouter(Navigation);

export { RouterNavigation as Navigation };
