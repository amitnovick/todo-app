import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  Collapse
} from "reactstrap";

import ModalWithActivator from "./ModalWithActivator.js";
import AuthContext from "../containers/Auth/AuthContext.js";

class NavBar extends React.Component {
  state = { isOpen: false };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {authContext => (
          <div>
            <Navbar color="inverse" light expand="md">
              <NavbarBrand tag={Link} to="/">
                todos
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <NavList isAuthenticated={authContext.isAuthenticated} />
              </Collapse>
            </Navbar>
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

const NavList = ({ isAuthenticated }) =>
  isAuthenticated ? (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag={Link} to="/app">
          App
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/features">
          Features
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/account">
          Account
        </NavLink>
      </NavItem>
    </Nav>
  ) : (
    <Nav className="ml-auto" navbar>
      <NavItem />
      <NavItem>
        <NavLink tag={Link} to="/demo">
          Demo
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/features">
          Features
        </NavLink>
      </NavItem>
      <NavItem>
        <ModalWithActivator />
      </NavItem>
    </Nav>
  );

export default NavBar;
