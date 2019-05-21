import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Header from '../Header/Header.js';
import Body from '../Body/index.js';
import styles from './style.module.css';

const ScreenLayout = () => (
  <TransitionGroup>
    <CSSTransition
      classNames={{
        appear: styles['fade-appear'],
        appearActive: styles['fade-appear-active']
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

export default ScreenLayout;
