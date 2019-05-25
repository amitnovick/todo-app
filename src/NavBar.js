/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { useService } from '@xstate/react';
import { darken } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import unauthenticatedRoutes from './routes/unauthenticatedRoutes';
import authenticatedRoutes from './routes/authenticatedRoutes';
import authenticationService from './state/authenticationService';

const authenticatedMenuTitleByPath = path => {
  switch (path) {
    case authenticatedRoutes.APP:
      return 'App';
    case authenticatedRoutes.FEATURES:
      return 'Features';
    case authenticatedRoutes.ACCOUNT:
      return 'Account';
    default:
      return 'Unknown';
  }
};

const authenticatedMenuItems = [
  {
    path: authenticatedRoutes.APP,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.APP)
  },
  {
    path: authenticatedRoutes.FEATURES,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.FEATURES)
  },
  {
    path: authenticatedRoutes.ACCOUNT,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.ACCOUNT)
  }
];

const unauthenticatedMenuTitleByPath = path => {
  switch (path) {
    case unauthenticatedRoutes.DEMO:
      return 'Demo';
    case unauthenticatedRoutes.FEATURES:
      return 'Features';
    case unauthenticatedRoutes.SIGNIN:
      return 'SignIn';
    default:
      return 'Unknown';
  }
};

const unauthenticatedMenuItems = [
  {
    path: unauthenticatedRoutes.DEMO,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.DEMO)
  },
  {
    path: unauthenticatedRoutes.FEATURES,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.FEATURES)
  },
  {
    path: unauthenticatedRoutes.SIGNIN,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.SIGNIN)
  }
];

const anchorStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'inline',
  margin: 2,
  padding: 0,
  textDecoration: 'none'
};

const navItemStyle = {
  color: 'white',
  ':hover': {
    textDecoration: 'underline'
  }
};

const MEDIA_QUERY_VIEWPORT_768 = '@media screen and (min-width: 768px)';

const isCollapsibleOpenStateAtom = Atom.of(false);

const MenuItems = ({ items }) => {
  const isCollapsibleOpen = useAtom(isCollapsibleOpenStateAtom);
  return (
    <ul
      css={{
        listStyleType: 'none',
        display: isCollapsibleOpen === false ? 'none' : 'block',
        [MEDIA_QUERY_VIEWPORT_768]: {
          display: 'flex',
          marginRight: '30px',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }
      }}
    >
      {items.map(({ path, menuTitle }) => (
        <li
          key={path}
          css={{
            textAlign: 'center',
            margin: '15px auto',
            [MEDIA_QUERY_VIEWPORT_768]: {
              margin: '0'
            }
          }}
        >
          <Link
            to={path}
            css={{
              ...anchorStyle,
              ...navItemStyle,
              [MEDIA_QUERY_VIEWPORT_768]: {
                marginLeft: '40px'
              }
            }}
          >
            {menuTitle}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NavBarTemplate = ({ items }) => (
  <nav
    css={{
      fontSize: 18,
      backgroundColor: darken(0.15, 'cyan'),
      border: '1px solid rgba(0, 0, 0, 0.2)',
      paddingBottom: 10,
      [MEDIA_QUERY_VIEWPORT_768]: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '0',
        height: '70px',
        alignItems: 'center'
      }
    }}
  >
    <span
      css={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        cursor: 'pointer',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '24px',
        [MEDIA_QUERY_VIEWPORT_768]: {
          display: 'none'
        }
      }}
      onClick={() => swap(isCollapsibleOpenStateAtom, state => !state)}
    >
      <FontAwesomeIcon icon={faBars} />
    </span>
    <Link
      to="/"
      css={{
        ...navItemStyle,
        ...anchorStyle,
        display: 'inline-block',
        fontSize: 22,
        fontWeight: 500,
        marginTop: 10,
        marginLeft: 20,
        [MEDIA_QUERY_VIEWPORT_768]: {
          marginTop: '0'
        }
      }}
    >
      Notes
    </Link>
    <MenuItems items={items} />
  </nav>
);

const NavBar = () => {
  const [{ value: authenticationState }] = useService(authenticationService);
  switch (authenticationState) {
    case 'authenticated':
      return <NavBarTemplate items={authenticatedMenuItems} />;
    case 'unauthenticated':
      return <NavBarTemplate items={unauthenticatedMenuItems} />;
    default:
      return null;
  }
};

export default NavBar;
