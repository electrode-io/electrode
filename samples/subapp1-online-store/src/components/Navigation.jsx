import React from "react";
import { Link } from "react-router-dom";
import electrodePng from "../../static/electrode.png";

const navRoutes = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
];

const NavItem = ({ to, children }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={to}>{children}</Link>
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
            {navRoutes.map((navRoute, i) => (
              <NavItem key={i} to={navRoute.path}>{navRoute.label}</NavItem>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
