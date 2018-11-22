import React from "react";
import { Link } from "react-router-dom";

import ModalWithActivator from "../modal-with-activator/index";
import withAuthContext from "../../containers/withAuthContext";

import "./style.css";

const NavBar = ({ isAuthenticated }) => (
  <nav>
    <ul className="navbar">
      <li>
        <Link to="/">Edit todos</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        {isAuthenticated ? (
          <Link to="/account">My Settings</Link>
        ) : (
          <ModalWithActivator />
        )}
      </li>
    </ul>
  </nav>
);

export default withAuthContext(NavBar);
