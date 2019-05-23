/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { Machine, interpret } from 'xstate';
import { useService } from '@xstate/react';
import { Atom, useAtom, swap, deref } from '@dbeining/react-atom';
import { darken, lighten } from 'polished';

import { linkWithPopup, signInWithPopup } from '../../firebase/auth';
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
  if (user == null) {
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
    authenticated: {},
    unauthenticated: {}
  }
});

const machineService = interpret(machine)
  .onTransition(state => console.log(state.value))
  .start();

const NotFoundScreen = () => <h1>Not found</h1>;

const SignInScreen = () => (
  <div>
    <h1>Sign-in</h1>
    <button
      onClick={() => signInWithPopup()}
      color="secondary"
      style={{
        backgroundColor: 'black',
        color: 'white',
        margin: '8px'
      }}
    >
      Sign in with GitHub
    </button>
  </div>
);

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

const UnauthenticatedNavBar = () => {
  const isCollapsibleOpen = useAtom(isCollapsibleOpenStateAtom);

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
    </nav>
  );
};

const unauthenticatedPageByPath = path => {
  switch (path) {
    case '/':
      return (
        <ScreenLayout
          HeaderComponent={UnauthenticatedNavBar}
          BodyComponent={AboutScreen}
        />
      );
    case '/features':
      return (
        <ScreenLayout
          HeaderComponent={UnauthenticatedNavBar}
          BodyComponent={AboutScreen}
        />
      );
    case '/demo':
      return (
        <ScreenLayout
          HeaderComponent={UnauthenticatedNavBar}
          BodyComponent={TodosScreenDemoAdapter}
        />
      );
    case '/signin':
      return (
        <ScreenLayout
          HeaderComponent={UnauthenticatedNavBar}
          BodyComponent={SignInScreen}
        />
      );
    default:
      return (
        <ScreenLayout
          HeaderComponent={UnauthenticatedNavBar}
          BodyComponent={NotFoundScreen}
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
      return (
        <div>
          <h2>authenticated</h2>
        </div>
      );
    case 'unauthenticated':
      return unauthenticatedPageByPath(currentPath);
    default:
      return (
        <div>
          <h2>Unknown state, please contact.</h2>
        </div>
      );
  }
};

export default AuthContainer;
