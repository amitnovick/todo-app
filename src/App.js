/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { useService } from '@xstate/react';
import { Atom, useAtom, swap, deref } from '@dbeining/react-atom';
import { darken, lighten } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AboutScreen from './pages/AboutScreen.js';
import ScreenLayout from './layout/Layout/ScreenLayout';
import TodosContainerDemo from './containers/Todos/TodosContainerDemo.js';
import TodosContext from './containers/Todos/TodosContext.js';
import TodosScreen from './pages/TodosScreen/TodosScreen.js';
import NotFoundScreen from './pages/NotFoundScreen';
import SignInScreen from './pages/SignInScreen';
import authenticationService from './state/authenticationService';
import AccountScreen from './pages/AccountScreen';

const currentPathAtom = Atom.of(window.location.pathname);

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const changePath = newPath => {
  swap(currentPathAtom, _ => newPath);
  window.history.pushState(null, null, newPath);
};

const anchorStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'inline',
  margin: 2,
  padding: 0
};

const navItemStyle = {
  textDdecoration: 'none',
  color: 'white'
};

const MEDIA_QUERY_VIEWPORT_768 = '@media screen and (min-width: 768px)';

const isCollapsibleOpenStateAtom = Atom.of(false);

const AuthenticatedMenuList = () => {
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
      <li
        key="app"
        css={{
          textAlign: 'center',
          margin: '15px auto',
          [MEDIA_QUERY_VIEWPORT_768]: {
            margin: '0'
          }
        }}
      >
        <button
          onClick={() => changePath('/app')}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            [MEDIA_QUERY_VIEWPORT_768]: {
              marginLeft: '40px'
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          App
        </button>
      </li>
      <li
        key="features"
        css={{
          textAlign: 'center',
          margin: '15px auto',
          [MEDIA_QUERY_VIEWPORT_768]: {
            margin: '0'
          }
        }}
      >
        <button
          onClick={() => changePath('/features')}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            [MEDIA_QUERY_VIEWPORT_768]: {
              marginLeft: '40px'
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Features
        </button>
      </li>
      <li
        key="account"
        css={{
          textAlign: 'center',
          margin: '15px auto',
          [MEDIA_QUERY_VIEWPORT_768]: {
            margin: '0'
          }
        }}
      >
        <button
          onClick={() => changePath('/account')}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            [MEDIA_QUERY_VIEWPORT_768]: {
              marginLeft: '40px'
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Account
        </button>
      </li>
    </ul>
  );
};

const UnauthenticatedMenuList = () => {
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
      <li
        key="demo"
        css={{
          textAlign: 'center',
          margin: '15px auto',
          [MEDIA_QUERY_VIEWPORT_768]: {
            margin: '0'
          }
        }}
      >
        <button
          onClick={() => changePath('/demo')}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            [MEDIA_QUERY_VIEWPORT_768]: {
              marginLeft: '40px'
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Demo
        </button>
      </li>
      <li
        key="features"
        css={{
          textAlign: 'center',
          margin: '15px auto',
          [MEDIA_QUERY_VIEWPORT_768]: {
            margin: '0'
          }
        }}
      >
        <button
          onClick={() => changePath('/features')}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            [MEDIA_QUERY_VIEWPORT_768]: {
              marginLeft: '40px'
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Features
        </button>
      </li>
      <li
        key="signin"
        css={{
          textAlign: 'center',
          margin: '15px auto',
          [MEDIA_QUERY_VIEWPORT_768]: {
            margin: '0'
          }
        }}
      >
        <button
          onClick={() => changePath('/signin')}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            [MEDIA_QUERY_VIEWPORT_768]: {
              marginLeft: '40px'
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          SignIn
        </button>
      </li>
    </ul>
  );
};

const NavBar = ({ MenuList }) => {
  return (
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
      <button
        onClick={() => changePath('/')}
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
          },
          ':hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Notes
      </button>
      {MenuList}
    </nav>
  );
};

const AuthenticatedPageByPath = ({ path }) => {
  switch (path) {
    case '/':
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<AuthenticatedMenuList />} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case '/features':
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<AuthenticatedMenuList />} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case '/app': // demo?
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<AuthenticatedMenuList />} />}
          BodyComponent={<TodosScreenDemoAdapter />} // TODO: Change to <TodosScreenCloudAdapter />
        />
      );
    case '/account': // signin?
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<AuthenticatedMenuList />} />}
          BodyComponent={<AccountScreen />}
        />
      );
    default:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<AuthenticatedMenuList />} />}
          BodyComponent={<NotFoundScreen />}
        />
      );
  }
};

const UnauthenticatedPageByPath = ({ path }) => {
  switch (path) {
    case '/':
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<UnauthenticatedMenuList />} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case '/features':
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<UnauthenticatedMenuList />} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case '/demo':
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<UnauthenticatedMenuList />} />}
          BodyComponent={<TodosScreenDemoAdapter />}
        />
      );
    case '/signin':
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<UnauthenticatedMenuList />} />}
          BodyComponent={<SignInScreen />}
        />
      );
    default:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar MenuList={<UnauthenticatedMenuList />} />}
          BodyComponent={<NotFoundScreen />}
        />
      );
  }
};

const App = () => {
  const [current] = useService(authenticationService);
  const currentPath = useAtom(currentPathAtom);
  const authenticationState = current.value;
  switch (authenticationState) {
    case 'loading':
      return (
        <div
          style={{ height: 10, width: '100%', backgroundColor: 'hotpink' }}
        />
      );
    case 'authenticated':
      return <AuthenticatedPageByPath path={currentPath} />;
    case 'unauthenticated':
      return <UnauthenticatedPageByPath path={currentPath} />;
    default:
      return (
        <div>
          <h2>Unknown state, please contact.</h2>
        </div>
      );
  }
};

export default App;
