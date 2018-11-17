import React from "react";

import NavBar from "../navbar/index.js";

const Header = ({ isAuthenticated, updateAuthentication }) => {
  return (
    <header>
      <NavBar
        isAuthenticated={isAuthenticated}
        updateAuthentication={updateAuthentication}
      />
    </header>
  );
};

export default Header;
