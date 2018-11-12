import React from "react";
import { Link } from "react-router-dom";
import withAuthentication from "../../containers/withAuthentication.js";
import AccountControl from "../account-control/index.js";

const Header = () => {
  const AuthAccountControl = withAuthentication(AccountControl);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">App</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <AuthAccountControl />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
