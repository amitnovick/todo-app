import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../Header.js';
import Body from '../Body/index.js';
import AuthContext from '../../containers/Auth/AuthContext.js';
import Delay from '../../components/Delay/Delay.js';
import styles from './style.module.css';

const ScreenLayout = () => (
  <TransitionGroup>
    <CSSTransition
      classNames={{
        appear: styles['fade-appear'],
        appearActive: styles['fade-appear-active'],
      }}
      appear={true}
      timeout={300}
    >
      <div>
        <Header />
        <Body />
      </div>
    </CSSTransition>
  </TransitionGroup>
);

const Layout = () => (
  <AuthContext.Consumer>
    {authContext => (
      // <ScreenLayout />
      <Delay
        component={ScreenLayout}
        shouldShow={!authContext.isAwaitingAuth}
        timeout={500}
      />
    )}
  </AuthContext.Consumer>
);

export default Layout;
