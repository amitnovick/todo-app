import React from "react";
import { Link } from "react-router-dom";

import AccountControl from "../account-control/index.js";

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">App</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <AccountControl />
      </li>
    </ul>
  </nav>
);

export default NavBar;
