import React from "react";
import { Link } from "react-router-dom";

import AccountControl from "../account-control/index";

import "./style.css";

const NavBar = () => (
  <nav>
    <ul className="navbar">
      <li>
        <Link to="/">Edit todos</Link>
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
