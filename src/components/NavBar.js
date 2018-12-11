import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse } from "reactstrap";

import NavList from "./NavList.js";

class NavBar extends React.Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="inverse" light expand="md">
          <NavbarBrand tag={Link} to="/">
            todos
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavList />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
