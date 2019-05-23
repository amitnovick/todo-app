import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './style.module.css';

const centerContentStyle = {
  width: '50%',
  margin: '0 auto'
};

const ScreenLayout = ({ HeaderComponent, BodyComponent }) => (
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
        {HeaderComponent}
        <div style={centerContentStyle}>{BodyComponent}</div>
      </div>
    </CSSTransition>
  </TransitionGroup>
);

export default ScreenLayout;
