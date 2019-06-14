import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { useService } from '@xstate/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { Machine, interpret } from 'xstate';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ScreenLayout from './layout/ScreenLayout/ScreenLayout';
import TodosContainerCloud from './containers/Todos/TodosContainerCloud';
import NotFoundScreen from './screens/NotFoundScreen';
import SignInScreenContainer from './screens/SignInScreen/Container';
import AccountScreen from './screens/AccountScreen/Container';
import authenticatedRoutes from './routes/authenticatedRoutes';
import sharedRoutes from './routes/sharedRoutes';
import AuthContext from './containers/Auth/AuthContext';
import firebaseApp from './firebase/firebaseApp';
import AuthenticatedNavBar from './containers/AuthenticatedNavBar';
import UnauthenticatedNavBar from './containers/UnauthenticatedNavBar';
import CommonBodyLayout from './layout/CommonBodyLayout';
import TodosScreenDemoAdapter from './screens/TodosScreenDemo';
import unauthenticatedRoutes from './routes/unauthenticatedRoutes';

const AuthenticatedPage = () => {
  return (
    <Switch>
      <Route
        exact
        path={sharedRoutes.HOME}
        render={() => (
          <ScreenLayout
            BodyComponent={<HomeScreen />}
            HeaderComponent={<AuthenticatedNavBar />}
          />
        )}
      />
      <Route
        exact
        path={sharedRoutes.FEATURES}
        render={() => (
          <ScreenLayout
            BodyComponent={<CommonBodyLayout BodyComponent={<AboutScreen />} />}
            HeaderComponent={<AuthenticatedNavBar />}
          />
        )}
      />
      <Route
        exact
        path={sharedRoutes.APP}
        render={() => (
          <ScreenLayout
            BodyComponent={
              <CommonBodyLayout BodyComponent={<TodosContainerCloud />} />
            }
            HeaderComponent={<AuthenticatedNavBar />}
          />
        )}
      />
      <Route
        exact
        path={authenticatedRoutes.ACCOUNT}
        render={() => (
          <ScreenLayout
            BodyComponent={
              <CommonBodyLayout BodyComponent={<AccountScreen />} />
            }
            HeaderComponent={<AuthenticatedNavBar />}
          />
        )}
      />
      <Route
        render={() => (
          <ScreenLayout
            BodyComponent={
              <CommonBodyLayout BodyComponent={<NotFoundScreen />} />
            }
            HeaderComponent={<AuthenticatedNavBar />}
          />
        )}
      />
    </Switch>
  );
};

const UnauthenticatedPage = () => {
  return (
    <Switch>
      <Route
        exact
        path={sharedRoutes.HOME}
        render={() => (
          <ScreenLayout
            BodyComponent={<HomeScreen />}
            HeaderComponent={<UnauthenticatedNavBar />}
          />
        )}
      />
      <Route
        exact
        path={sharedRoutes.FEATURES}
        render={() => (
          <ScreenLayout
            BodyComponent={<CommonBodyLayout BodyComponent={<AboutScreen />} />}
            HeaderComponent={<UnauthenticatedNavBar />}
          />
        )}
      />
      <Route
        exact
        path={sharedRoutes.APP}
        render={() => (
          <ScreenLayout
            BodyComponent={
              <CommonBodyLayout BodyComponent={<TodosScreenDemoAdapter />} />
            }
            HeaderComponent={<UnauthenticatedNavBar />}
          />
        )}
      />
      <Route
        exact
        path={unauthenticatedRoutes.SIGNIN}
        render={() => (
          <ScreenLayout
            BodyComponent={
              <CommonBodyLayout BodyComponent={<SignInScreenContainer />} />
            }
            HeaderComponent={<UnauthenticatedNavBar />}
          />
        )}
      />
      <Route
        render={() => (
          <ScreenLayout
            BodyComponent={
              <CommonBodyLayout BodyComponent={<NotFoundScreen />} />
            }
            HeaderComponent={<UnauthenticatedNavBar />}
          />
        )}
      />
    </Switch>
  );
};

function updateAuthState(user) {
  if (user != null) {
    swap(userOAuthAtom, _ => user);
    authenticationService.send(
      'AUTHENTICATED_SUCCESSFULLY_DURING_INITIAL_PAGE_LOAD'
    );
  } else {
    authenticationService.send(
      'AUTHENTICATION_FAILED_DURING_INITIAL_PAGE_LOAD'
    );
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
        AUTHENTICATED_SUCCESSFULLY_DURING_INITIAL_PAGE_LOAD: 'authenticated',
        AUTHENTICATION_FAILED_DURING_INITIAL_PAGE_LOAD: 'unauthenticated'
      }
    },
    authenticated: {
      on: {
        UNAUTHENTICATED_SUCCESSFULLY_FROM_ACCOUNT_SCREEN: 'unauthenticated'
      }
    },
    unauthenticated: {
      on: {
        AUTHENTICATED_SUCCESSFULLY_FROM_SIGNIN_SCREEN: 'authenticated',
        actions: [(_, event) => swap(userOAuthAtom, _ => event.user)]
      }
    }
  }
});

const authenticationService = interpret(machine).start();

const userOAuthAtom = Atom.of(null);

const AuthenticationContainer = ({ send, children }) => {
  const userOAuth = useAtom(userOAuthAtom);
  return (
    <AuthContext.Provider
      value={{
        userOAuth,
        send
      }}
    >
      {children}
    </AuthContext.Provider>
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

const ScreenRouterContainer = () => (
  <Router>
    <ScreenRouter />
  </Router>
);

export default ScreenRouterContainer;
