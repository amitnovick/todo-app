import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import ModalWithActivator from "../ModalWithActivator";
import { AuthContext } from "../../containers/AuthContainer";

const NavBar = () => (
  <AuthContext.Consumer>
    {authContext => (
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">Edit todos</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {authContext.isAuthenticated ? (
              <Link to="/account">My Settings</Link>
            ) : (
              <ModalWithActivator />
            )}
          </li>
        </ul>
      </nav>
    )}
  </AuthContext.Consumer>
);

export default NavBar;
