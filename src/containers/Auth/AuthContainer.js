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

const centeredDivStyle = {};

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
  margin: 0,
  padding: 0
};

const UnauthenticatedNavBar = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      height: navBarRadius,
      backgroundColor: darken(0.1, 'cyan'),
      paddingLeft: 4,
      paddingRight: 4,
      borderBottom: '1px solid'
    }}
  >
    <button
      style={{
        color: 'white',
        lineHeight: '34px',
        verticalAlign: 'middle',
        fontSize: 26,
        fontWeight: 700,
        backgroundColor: 'transparent',
        ...anchorStyle
      }}
      onClick={() => changePath('/')}
    >
      Notes
    </button>
    <ul>
      <li key="demo" style={{ display: 'inline-block' }}>
        <button
          style={{
            ...anchorStyle,
            color: 'white',
            fontSize: 22,
            fontWeight: 500,
            margin: 2,
            lineHeight: '34px',
            verticalAlign: 'middle'
          }}
          onClick={() => changePath('/demo')}
        >
          Demo
        </button>
      </li>
      <li style={{ display: 'inline-block' }}>
        <button
          style={{
            ...anchorStyle,
            color: 'white',
            fontSize: 22,
            fontWeight: 500,
            margin: 2,
            lineHeight: '34px',
            verticalAlign: 'middle'
          }}
          onClick={() => changePath('/features')}
        >
          Features
        </button>
      </li>
      <li key="signin" style={{ display: 'inline-block' }}>
        <button
          style={{
            ...anchorStyle,
            color: 'white',
            fontSize: 22,
            fontWeight: 500,
            margin: 2,
            lineHeight: '34px',
            verticalAlign: 'middle'
          }}
          onClick={() => changePath('/signin')}
        >
          SignIn
        </button>
      </li>
    </ul>
    <div />
  </div>
);

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
