import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import TodosScreen from '../../components/TodosScreen/index.js';
import AboutScreen from '../../components/AboutScreen.js';
import AccountScreen from '../../components/AccountScreen.js';
import TodosContainerDemo from '../../containers/Todos/TodosContainerDemo.js';
import TodosContainerCloud from '../../containers/Todos/TodosContainerCloud.js';
import TodosContext from '../../containers/Todos/TodosContext.js';
import AuthContext from '../../containers/Auth/AuthContext.js';

import './style.css';
import styles from './style.module.css';

const HomeScreen = () => <h1>Welcome</h1>;

const NotFoundScreen = () => <h1>Not found</h1>;

const SignInScreen = () => <h1>Sign-in</h1>;

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

const UserRoute = ({ path, component: Component }) => (
  <AuthContext.Consumer>
    {authContext => (
      <Route
        exact
        path={path}
        render={() =>
          authContext.isAuthenticated ? (
            <Component />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    )}
  </AuthContext.Consumer>
);

const GuestRoute = ({ path, component: Component }) => (
  <AuthContext.Consumer>
    {authContext => (
      <Route
        exact
        path={path}
        render={() =>
          authContext.isAuthenticated ? <Redirect to="/" /> : <Component />
        }
      />
    )}
  </AuthContext.Consumer>
);

const Body = () => (
  <main className={styles['main-1']}>
    <Route
      render={({ location }) => (
        <TransitionGroup className={styles['transition-group-1']}>
          <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <section className={styles['section-1']}>
              <Switch location={location}>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/features" component={AboutScreen} />
                <Route exact path="/demo" component={TodosScreenDemoAdapter} />
                <UserRoute path="/app" component={TodosScreenCloudAdapter} />
                <UserRoute path="/account" component={AccountScreen} />
                <GuestRoute path="/signin" component={SignInScreen} />
                <Route component={NotFoundScreen} />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  </main>
);

export default Body;
