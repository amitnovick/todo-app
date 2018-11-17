import React from "react";

import NavBar from "../navbar/index.js";

const Header = ({ isAuthenticated }) => {
  return (
    <header>
      <NavBar isAuthenticated={isAuthenticated} />
    </header>
  );
};

export default Header;
