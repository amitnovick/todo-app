import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ScreenLayout from './layout/ScreenLayout/ScreenLayout';
import TodosContainerCloud from './containers/Todos/TodosContainerCloud/TodosContainerCloud';
import NotFoundScreen from './screens/NotFoundScreen';
import SignInScreenContainer from './screens/SignInScreen/Container';
import AccountScreen from './screens/AccountScreen/Container';
import authenticatedRoutes from './routes/authenticatedRoutes';
import sharedRoutes from './routes/sharedRoutes';
import AuthenticatedNavBar from './components/AuthenticatedNavBar';
import UnauthenticatedNavBar from './components/UnauthenticatedNavBar';
import CommonBodyLayout from './layout/CommonBodyLayout';
import TodosScreenDemoAdapter from './screens/TodosScreenDemo';
import unauthenticatedRoutes from './routes/unauthenticatedRoutes';
import withAuth from './containers/Auth/withAuth';

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

const ScreenRouter = ({ authenticationState }) => {
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

const WrappedScreenRouter = withAuth(ScreenRouter);

const ScreenRouterContainer = () => (
  <Router>
    <WrappedScreenRouter />
  </Router>
);

export default ScreenRouterContainer;
