/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { Machine, interpret } from 'xstate';
import { useService } from '@xstate/react';
import { Atom, useAtom, swap, deref } from '@dbeining/react-atom';
import { darken, lighten } from 'polished';

import { linkWithPopup, signInWithPopup, signOut } from '../../firebase/auth';
import firebaseApp from '../../firebase/firebaseApp.js';
// import globalContext from "./AuthContext";
import AboutScreen from '../../pages/AboutScreen.js';
// import AccountScreen from '../../pages/AccountScreen.js';
import ScreenLayout from '../../layout/Layout/ScreenLayout';
import TodosContainerDemo from '../Todos/TodosContainerDemo.js';
import TodosContext from '../../containers/Todos/TodosContext.js';
import TodosScreen from '../../pages/TodosScreen/TodosScreen.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const userOAuthAtom = Atom.of(null);

const currentPathAtom = Atom.of(window.location.pathname);

function updateAuthState(user) {
  if (user != null) {
    swap(userOAuthAtom, _ => user);
    machineService.send('AUTHENTICATED_SUCCESSFULLY');
  } else {
    machineService.send('AUTHENTICATION_FAILED');
  }
}

const subscribeToAuthChanges = () =>
  firebaseApp.auth().onAuthStateChanged(updateAuthState);

const machine = Machine({
  id: 'main',
  initial: 'loading',
  states: {
    loading: {
      onEntry: [subscribeToAuthChanges],
      on: {
        AUTHENTICATED_SUCCESSFULLY: 'authenticated',
        AUTHENTICATION_FAILED: 'unauthenticated'
      }
    },
    authenticated: {
      on: {
        UNAUTHENTICATED_SUCCESSFULLY: 'unauthenticated'
      }
    },
    unauthenticated: {
      on: {
        AUTHENTICATED_SUCCESSFULLY: 'authenticated'
      }
    }
  }
});

const machineService = interpret(machine)
  .onTransition(state => console.log(state.value))
  .start();

const NotFoundScreen = () => <h1>Not found</h1>;

const signInScreenMachine = Machine({
  id: 'sign-in-screen',
  initial: 'idle',
  states: {
    idle: {
      on: {
        AUTHENTICATION_FAILED: 'loginFailed'
      }
    },
    loginFailed: {}
  }
});

const signInScreenMahineService = interpret(signInScreenMachine)
  .onTransition(state => console.log(state.value))
  .start();

const SignInScreenTemplate = ({ hasFailedLogin }) => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={async () => {
        try {
          const { user } = await signInWithPopup();
          swap(userOAuthAtom, _ => user);
          machineService.send('AUTHENTICATED_SUCCESSFULLY');
        } catch (error) {
          if (
            error &&
            [
              'auth/popup-closed-by-user',
              'auth/cancelled-popup-request'
            ].includes(error.code) === false
          ) {
            console.log(error);
            signInScreenMahineService.send('AUTHENTICATION_FAILED');
          }
        }
      }}
      style={{
        backgroundColor: 'black',
        color: 'white',
        margin: '8px'
      }}
    >
      Sign in with GitHub
    </button>
    {hasFailedLogin ? <p style={{ color: 'red' }}>Failed to login</p> : null}
  </div>
);

const SignInScreen = () => {
  const [current] = useService(signInScreenMahineService);
  const uiState = current.value;
  switch (uiState) {
    case 'idle':
      return <SignInScreenTemplate hasFailedLogin={false} />;
    case 'loginFailed':
      return <SignInScreenTemplate hasFailedLogin={true} />;
    default:
      return <div>Unknown state, please report.</div>;
  }
};

const handleLogOut = async () => {
  try {
    await signOut();
    machineService.send('UNAUTHENTICATED_SUCCESSFULLY');
  } catch (error) {
    console.log(error);
  }
};

const AccountScreen = () => {
  const { email } = useAtom(userOAuthAtom);

  return (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => handleLogOut()}>Logout</button>
      <p>Email: {email}</p>
    </div>
  );
};

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

const AuthContainer = () => {
  const [current] = useService(machineService);
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

export default AuthContainer;
