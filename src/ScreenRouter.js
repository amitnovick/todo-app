import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { useService } from '@xstate/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AboutScreen from './screens/AboutScreen.js';
import ScreenLayout from './layout/Layout/ScreenLayout';
import TodosContainerDemo from './containers/Todos/TodosContainerDemo.js';
import TodosContainerCloud from './containers/Todos/TodosContainerCloud';
import TodosContext from './containers/Todos/TodosContext.js';
import TodosScreen from './screens/TodosScreen/TodosScreen.js';
import NotFoundScreen from './screens/NotFoundScreen';
import SignInScreen from './screens/SignInScreen';
import AccountScreen from './screens/AccountScreen';
import authenticationService from './state/authenticationService';
import unauthenticatedRoutes from './routes/unauthenticatedRoutes';
import authenticatedRoutes from './routes/authenticatedRoutes';

const TodosScreenCloudAdapter = () => (
  <TodosContainerCloud>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerCloud>
);

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const AuthenticatedPage = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={authenticatedRoutes.HOME}
          render={() => <ScreenLayout BodyComponent={<AboutScreen />} />}
        />
        <Route
          exact
          path={authenticatedRoutes.FEATURES}
          render={() => <ScreenLayout BodyComponent={<AboutScreen />} />}
        />
        <Route
          exact
          path={authenticatedRoutes.APP}
          render={() => (
            <ScreenLayout BodyComponent={<TodosScreenCloudAdapter />} />
          )}
        />
        <Route
          exact
          path={authenticatedRoutes.ACCOUNT}
          render={() => <ScreenLayout BodyComponent={<AccountScreen />} />}
        />
        <Route
          render={() => <ScreenLayout BodyComponent={<NotFoundScreen />} />}
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
          render={() => <ScreenLayout BodyComponent={<AboutScreen />} />}
        />
        <Route
          exact
          path={unauthenticatedRoutes.FEATURES}
          render={() => <ScreenLayout BodyComponent={<AboutScreen />} />}
        />
        <Route
          exact
          path={unauthenticatedRoutes.DEMO}
          render={() => (
            <ScreenLayout BodyComponent={<TodosScreenDemoAdapter />} />
          )}
        />
        <Route
          exact
          path={unauthenticatedRoutes.SIGNIN}
          render={() => <ScreenLayout BodyComponent={<SignInScreen />} />}
        />
        <Route
          render={() => <ScreenLayout BodyComponent={<NotFoundScreen />} />}
        />
      </Switch>
    </Router>
  );
};

const ScreenRouter = () => {
  const [current] = useService(authenticationService);
  const authenticationState = current.value;
  switch (authenticationState) {
    case 'loading':
      return (
        <div
          style={{ height: 10, width: '100%', backgroundColor: 'hotpink' }}
        />
      );
    case 'authenticated':
      return <AuthenticatedPage />;
    case 'unauthenticated':
      return <UnauthenticatedPage />;
    default:
      return (
        <div>
          <h2>Unknown state, please contact.</h2>
        </div>
      );
  }
};

export default ScreenRouter;
