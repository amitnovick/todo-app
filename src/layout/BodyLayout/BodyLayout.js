import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import {
  centeredDivStyle,
  mainStyle,
  sectionStyle,
  transitionGroupStyle,
  transitionFadeEnter,
  transitionFadeEnterActive,
  transitionFadeExit,
  transitionFadeExitActive
} from './style';

const BodyLayout = ({ BodyComponent, location }) => (
  <div className={centeredDivStyle}>
    <main className={mainStyle}>
      <TransitionGroup className={transitionGroupStyle}>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={{
            enter: transitionFadeEnter,
            enterActive: transitionFadeEnterActive,
            exit: transitionFadeExit,
            exitActive: transitionFadeExitActive
          }}
        >
          <section className={sectionStyle}>{BodyComponent}</section>
        </CSSTransition>
      </TransitionGroup>
    </main>
  </div>
);

export default withRouter(BodyLayout);
