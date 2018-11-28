import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import ModalWithActivator from "../ModalWithActivator";
import { AuthContext } from "../../containers/AuthContainer";

const NavBar = () => (
  <AuthContext.Consumer>
    {authContext => (
      <nav>
        <NavList isAuthenticated={authContext.isAuthenticated} />
      </nav>
    )}
  </AuthContext.Consumer>
);

export default NavBar;

const NavList = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <ul className="navbar">
      <li>
        <Link to="/">Edit todos</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/account">My Account</Link>
      </li>
    </ul>
  ) : (
    <ul className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/demo">Demo</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <ModalWithActivator />
      </li>
    </ul>
  );
