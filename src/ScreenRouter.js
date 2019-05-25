import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { useService } from '@xstate/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { Machine, interpret } from 'xstate';

import AboutScreen from './screens/AboutScreen.js';
import ScreenLayout from './layout/Layout/ScreenLayout';
import TodosContainerDemo from './containers/Todos/TodosContainerDemo.js';
import TodosContainerCloud from './containers/Todos/TodosContainerCloud';
import TodosContext from './containers/Todos/TodosContext.js';
import TodosScreen from './screens/TodosScreen/TodosScreen.js';
import NotFoundScreen from './screens/NotFoundScreen';
import SignInScreenContainer from './screens/SignInScreen';
import AccountScreen from './screens/AccountScreen';
import unauthenticatedRoutes from './routes/unauthenticatedRoutes';
import authenticatedRoutes from './routes/authenticatedRoutes';
import UserOAuthContext from './containers/Auth/AuthContext.js';
import firebaseApp from './firebase/firebaseApp';
import AuthenticatedNavBar from './AuthenticatedNavBar';
import UnauthenticatedNavBar from './UnauthenticatedNavBar';

const TodosScreenCloudAdapter = () => (
  <UserOAuthContext.Consumer>
    {(userOAuthContext /* TODO: Check that this is working! */) => (
      <TodosContainerCloud {...userOAuthContext}>
        <TodosContext.Consumer>
          {todosContext => <TodosScreen {...todosContext} />}
        </TodosContext.Consumer>
      </TodosContainerCloud>
    )}
  </UserOAuthContext.Consumer>
);

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const AccountScreenAdapter = () => (
  <UserOAuthContext.Consumer>
    {userOAuthContext => <AccountScreen {...userOAuthContext} />}
  </UserOAuthContext.Consumer>
);

const SignInScrenAdapter = () => (
  <UserOAuthContext.Consumer>
    {userOAuthContext => {
      return <SignInScreenContainer {...userOAuthContext} />;
    }}
  </UserOAuthContext.Consumer>
);

const AuthenticatedPage = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={authenticatedRoutes.HOME}
          render={() => (
            <ScreenLayout
              BodyComponent={<AboutScreen />}
              HeaderComponent={<AuthenticatedNavBar />}
            />
          )}
        />
        <Route
          exact
          path={authenticatedRoutes.FEATURES}
          render={() => (
            <ScreenLayout
              BodyComponent={<AboutScreen />}
              HeaderComponent={<AuthenticatedNavBar />}
            />
          )}
        />
        <Route
          exact
          path={authenticatedRoutes.APP}
          render={() => (
            <ScreenLayout
              BodyComponent={<TodosScreenCloudAdapter />}
              HeaderComponent={<AuthenticatedNavBar />}
            />
          )}
        />
        <Route
          exact
          path={authenticatedRoutes.ACCOUNT}
          render={() => (
            <ScreenLayout
              BodyComponent={<AccountScreenAdapter />}
              HeaderComponent={<AuthenticatedNavBar />}
            />
          )}
        />
        <Route
          render={() => (
            <ScreenLayout
              BodyComponent={<NotFoundScreen />}
              HeaderComponent={<AuthenticatedNavBar />}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

const UnauthenticatedPage = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={unauthenticatedRoutes.HOME}
          render={() => (
            <ScreenLayout
              BodyComponent={<AboutScreen />}
              HeaderComponent={<UnauthenticatedNavBar />}
            />
          )}
        />
        <Route
          exact
          path={unauthenticatedRoutes.FEATURES}
          render={() => (
            <ScreenLayout
              BodyComponent={<AboutScreen />}
              HeaderComponent={<UnauthenticatedNavBar />}
            />
          )}
        />
        <Route
          exact
          path={unauthenticatedRoutes.DEMO}
          render={() => (
            <ScreenLayout
              BodyComponent={<TodosScreenDemoAdapter />}
              HeaderComponent={<UnauthenticatedNavBar />}
            />
          )}
        />
        <Route
          exact
          path={unauthenticatedRoutes.SIGNIN}
          render={() => (
            <ScreenLayout
              BodyComponent={<SignInScrenAdapter />}
              HeaderComponent={<UnauthenticatedNavBar />}
            />
          )}
        />
        <Route
          render={() => (
            <ScreenLayout
              BodyComponent={<NotFoundScreen />}
              HeaderComponent={<UnauthenticatedNavBar />}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

function updateAuthState(user) {
  if (user != null) {
    swap(userOAuthAtom, _ => user);
    authenticationService.send('AUTHENTICATED_SUCCESSFULLY');
  } else {
    authenticationService.send('AUTHENTICATION_FAILED');
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
        AUTHENTICATED_SUCCESSFULLY: 'authenticated',
        actions: [(_, event) => swap(userOAuthAtom, _ => event.user)]
      }
    }
  }
});

const authenticationService = interpret(machine)
  .onTransition(state => console.log(state.value))
  .start();

const userOAuthAtom = Atom.of(null);

const AuthenticationContainer = ({ send, children }) => {
  const userOAuth = useAtom(userOAuthAtom);
  return (
    <UserOAuthContext.Provider
      value={{
        userOAuth,
        send
      }}
    >
      {children}
    </UserOAuthContext.Provider>
  );
};

const ScreenRouter = () => {
  const [current, send] = useService(authenticationService);
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
        <AuthenticationContainer send={send}>
          <AuthenticatedPage />
        </AuthenticationContainer>
      );
    case 'unauthenticated':
      return (
        <AuthenticationContainer send={send}>
          <UnauthenticatedPage />
        </AuthenticationContainer>
      );
    default:
      return (
        <div>
          <h2>Unknown state, please contact.</h2>
        </div>
      );
  }
};

export default ScreenRouter;
