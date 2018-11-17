import React from "react";
import { Link } from "react-router-dom";

import AccountControl from "../account-control/index.js";

const NavBar = ({ isAuthenticated, updateAuthentication }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">App</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <AccountControl
          isAuthenticated={isAuthenticated}
          updateAuthentication={updateAuthentication}
        />
      </li>
    </ul>
  </nav>
);

export default NavBar;
