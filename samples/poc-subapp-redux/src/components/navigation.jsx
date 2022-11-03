import React from "react";
import { Link } from "react-router-dom";

const NavItem = props => {
  const { to, children } = props;
  return (
    <li>
      <Link to={to}>
        <div>{children}</div>
      </Link>
    </li>
  );
};

export const Navigation = () => {
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