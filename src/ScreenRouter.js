import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { useService } from '@xstate/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { Machine, interpret } from 'xstate';

import AboutScreen from './screens/AboutScreen';
import ScreenLayout from './components/Layout/ScreenLayout';
import TodosContainerDemo from './containers/Todos/TodosContainerDemo';
import TodosContainerCloud from './containers/Todos/TodosContainerCloud';
import TodosContext from './containers/Todos/TodosContext';
import TodosScreen from './screens/TodosScreen/TodosScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import SignInScreenContainer from './screens/SignInScreen/Presentational';
import AccountScreen from './screens/AccountScreen/Container';
import unauthenticatedRoutes from './routes/unauthenticatedRoutes';
import authenticatedRoutes from './routes/authenticatedRoutes';
import AuthContext from './containers/Auth/AuthContext';
import firebaseApp from './firebase/firebaseApp';
import AuthenticatedNavBar from './containers/AuthenticatedNavBar';
import UnauthenticatedNavBar from './containers/UnauthenticatedNavBar';

const TodosScreenCloudAdapter = () => (
  <AuthContext.Consumer>
    {(userOAuthContext /* TODO: Check that this is working! */) => (
      <TodosContainerCloud {...userOAuthContext}>
        <TodosContext.Consumer>
          {todosContext => <TodosScreen {...todosContext} />}
        </TodosContext.Consumer>
      </TodosContainerCloud>
    )}
  </AuthContext.Consumer>
);

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const AccountScreenAdapter = () => (
  <AuthContext.Consumer>
    {userOAuthContext => <AccountScreen {...userOAuthContext} />}
  </AuthContext.Consumer>
);

const SignInScrenAdapter = () => (
  <AuthContext.Consumer>
    {userOAuthContext => {
      return <SignInScreenContainer {...userOAuthContext} />;
    }}
  </AuthContext.Consumer>
);

const AuthenticatedPage = () => {
  return (
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
  );
};

const UnauthenticatedPage = () => {
  return (
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

const authenticationService = interpret(machine)
  .onTransition(state => console.log(state.value))
  .start();

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
