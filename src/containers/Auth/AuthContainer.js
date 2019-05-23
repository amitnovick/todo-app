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
import logo from '../../assets/edit.png'; // https://www.flaticon.com/free-icon/edit_263062#term=edit&page=1&position=20

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

const HomeScreen = () => <q style={{ fontSize: 16 }}>We do what we must</q>;

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

const iconRadius = 34;

const navBarRadius = iconRadius + 4;

/* <input
type="image"
src={logo}
alt="edit_logo"
style={{
  width: iconRadius,
  height: iconRadius,
  margin: 2
}}
onClick={() => changePath('/')}
/> */

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
  color: 'rgba(255, 255, 255, 0.7)'
};

const MEDIA_QUERY_VIEWPORT_400 = '@media screen and (min-width: 400px)';

const isCollapsibleOpenStateAtom = Atom.of(false);

const UnauthenticatedNavBar = () => {
  const isCollapsibleOpen = useAtom(isCollapsibleOpenStateAtom);

  return (
    <nav
      css={{
        fontSize: 18,
        backgroundImage: 'linear-gradient(260deg, #2376ae 0%, #c16ecf 100%)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        paddingBottom: 10,
        [MEDIA_QUERY_VIEWPORT_400]: {
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
          [MEDIA_QUERY_VIEWPORT_400]: {
            display: 'none'
          }
        }}
        onClick={() => swap(isCollapsibleOpenStateAtom, state => !state)}
      >
        HAM
      </span>
      <button
        onClick={() => changePath('/')}
        css={{
          ...navItemStyle,
          ...anchorStyle,
          display: 'inline-block',
          fontSize: 22,
          marginTop: 10,
          marginLeft: 20,
          [MEDIA_QUERY_VIEWPORT_400]: {
            marginTop: '0'
          },
          ':hover': {
            color: 'rgba(255, 255, 255, 1)'
          }
        }}
      >
        Notes
      </button>
      <ul
        css={{
          listStyleType: 'none',
          display: isCollapsibleOpen === false ? 'none' : 'block',
          [MEDIA_QUERY_VIEWPORT_400]: {
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
            [MEDIA_QUERY_VIEWPORT_400]: {
              margin: '0'
            }
          }}
        >
          <button
            onClick={() => changePath('/demo')}
            css={{
              ...anchorStyle,
              ...navItemStyle,
              [MEDIA_QUERY_VIEWPORT_400]: {
                marginLeft: '40px'
              },
              ':hover': {
                color: 'rgba(255, 255, 255, 1)'
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
            [MEDIA_QUERY_VIEWPORT_400]: {
              margin: '0'
            }
          }}
        >
          <button
            onClick={() => changePath('/features')}
            css={{
              ...anchorStyle,
              ...navItemStyle,
              [MEDIA_QUERY_VIEWPORT_400]: {
                marginLeft: '40px'
              },
              ':hover': {
                color: 'rgba(255, 255, 255, 1)'
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
            [MEDIA_QUERY_VIEWPORT_400]: {
              margin: '0'
            }
          }}
        >
          <button
            onClick={() => changePath('/signin')}
            css={{
              ...anchorStyle,
              ...navItemStyle,
              [MEDIA_QUERY_VIEWPORT_400]: {
                marginLeft: '40px'
              },
              ':hover': {
                color: 'rgba(255, 255, 255, 1)'
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
          BodyComponent={HomeScreen}
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
