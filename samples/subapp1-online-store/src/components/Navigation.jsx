import React from "react";
import { Link } from "react-router-dom";
import electrodePng from "../../static/electrode.png";

const NavItem = (props) => {
  const { to, children } = props;
  return (
    <li className="nav-item">
      <Link className="nav-link" to={to}>
        {children}
      </Link>
    </li>
  );
};

export const Navigation = () => {
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
            <NavItem to="/">Home</NavItem>
            <NavItem to="/products">Products</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};
