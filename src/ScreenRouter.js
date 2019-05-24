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
import AccountScreen from './screens/AccountScreen';
import currentPathAtom from './state/currentPathAtom';
import authenticationService from './state/authenticationService';
import unauthenticatedRoutes from './routes/unauthenticatedRoutes';
import authenticatedRoutes from './routes/authenticatedRoutes';

const TodosScreenDemoAdapter = () => (
  <TodosContainerDemo>
    <TodosContext.Consumer>
      {todosContext => <TodosScreen {...todosContext} />}
    </TodosContext.Consumer>
  </TodosContainerDemo>
);

const AuthenticatedPageByPath = ({ path }) => {
  switch (path) {
    case authenticatedRoutes.HOME:
      return <ScreenLayout BodyComponent={<AboutScreen />} />;
    case authenticatedRoutes.FEATURES:
      return <ScreenLayout BodyComponent={<AboutScreen />} />;
    case authenticatedRoutes.APP:
      return (
        <ScreenLayout
          BodyComponent={<TodosScreenDemoAdapter />} // TODO: Change to <TodosScreenCloudAdapter />
        />
      );
    case authenticatedRoutes.ACCOUNT:
      return <ScreenLayout BodyComponent={<AccountScreen />} />;
    default:
      return <ScreenLayout BodyComponent={<NotFoundScreen />} />;
  }
};

const UnauthenticatedPageByPath = ({ path }) => {
  switch (path) {
    case unauthenticatedRoutes.HOME:
      return <ScreenLayout BodyComponent={<AboutScreen />} />;
    case unauthenticatedRoutes.FEATURES:
      return <ScreenLayout BodyComponent={<AboutScreen />} />;
    case unauthenticatedRoutes.DEMO:
      return <ScreenLayout BodyComponent={<TodosScreenDemoAdapter />} />;
    case unauthenticatedRoutes.SIGNIN:
      return <ScreenLayout BodyComponent={<SignInScreen />} />;
    default:
      return <ScreenLayout BodyComponent={<NotFoundScreen />} />;
  }
};

const ScreenRouter = () => {
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

export default ScreenRouter;
