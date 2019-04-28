import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import withAuthentication from '../../../containers/Auth/withAuthentication.js';
import ModalWithActivator from '../../../components/ModalWithActivator.js';

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

export default withAuthentication(NavList);
