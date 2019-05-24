import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method
import { useService } from '@xstate/react';
import { useAtom } from '@dbeining/react-atom';
import AboutScreen from './screens/AboutScreen.js';
import ScreenLayout from './layout/Layout/ScreenLayout';
import TodosContainerDemo from './containers/Todos/TodosContainerDemo.js';
import TodosContext from './containers/Todos/TodosContext.js';
import TodosScreen from './screens/TodosScreen/TodosScreen.js';
import NotFoundScreen from './screens/NotFoundScreen';
import SignInScreen from './screens/SignInScreen';
import authenticationService from './state/authenticationService';
import AccountScreen from './screens/AccountScreen';
import currentPathAtom from './state/currentPathAtom';
import NavBar from './NavBar';

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const authenticatedRoutes = {
  HOME: '/',
  APP: '/app',
  FEATURES: '/features',
  ACCOUNT: '/account'
};

const authenticatedMenuTitleByPath = path => {
  switch (path) {
    case authenticatedRoutes.APP:
      return 'Demo';
    case authenticatedRoutes.FEATURES:
      return 'Features';
    case authenticatedRoutes.ACCOUNT:
      return 'SignIn';
    default:
      return 'Unknown';
  }
};

const authenticatedMenuItems = [
  {
    path: authenticatedRoutes.APP,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.APP)
  },
  {
    path: authenticatedRoutes.FEATURES,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.FEATURES)
  },
  {
    path: authenticatedRoutes.ACCOUNT,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.ACCOUNT)
  }
];

const unauthenticatedRoutes = {
  HOME: '/',
  DEMO: '/demo',
  FEATURES: '/features',
  SIGNIN: '/signin'
};

const unauthenticatedMenuTitleByPath = path => {
  switch (path) {
    case unauthenticatedRoutes.DEMO:
      return 'Demo';
    case unauthenticatedRoutes.FEATURES:
      return 'Features';
    case unauthenticatedRoutes.SIGNIN:
      return 'SignIn';
    default:
      return 'Unknown';
  }
};

const unauthenticatedMenuItems = [
  {
    path: unauthenticatedRoutes.DEMO,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.DEMO)
  },
  {
    path: unauthenticatedRoutes.FEATURES,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.FEATURES)
  },
  {
    path: unauthenticatedRoutes.SIGNIN,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.SIGNIN)
  }
];

const AuthenticatedPageByPath = ({ path }) => {
  switch (path) {
    case authenticatedRoutes.HOME:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={authenticatedMenuItems} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case authenticatedRoutes.FEATURES:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={authenticatedMenuItems} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case authenticatedRoutes.APP:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={authenticatedMenuItems} />}
          BodyComponent={<TodosScreenDemoAdapter />} // TODO: Change to <TodosScreenCloudAdapter />
        />
      );
    case authenticatedRoutes.ACCOUNT:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={authenticatedMenuItems} />}
          BodyComponent={<AccountScreen />}
        />
      );
    default:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={authenticatedMenuItems} />}
          BodyComponent={<NotFoundScreen />}
        />
      );
  }
};

const UnauthenticatedPageByPath = ({ path }) => {
  switch (path) {
    case unauthenticatedRoutes.HOME:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={unauthenticatedMenuItems} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case unauthenticatedRoutes.FEATURES:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={unauthenticatedMenuItems} />}
          BodyComponent={<AboutScreen />}
        />
      );
    case unauthenticatedRoutes.DEMO:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={unauthenticatedMenuItems} />}
          BodyComponent={<TodosScreenDemoAdapter />}
        />
      );
    case unauthenticatedRoutes.SIGNIN:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={unauthenticatedMenuItems} />}
          BodyComponent={<SignInScreen />}
        />
      );
    default:
      return (
        <ScreenLayout
          HeaderComponent={<NavBar menuItems={unauthenticatedMenuItems} />}
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
