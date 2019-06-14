import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import styles from './style.module.css';
import {
  StyledCenteringDiv,
  StyledMain,
  StyledSection,
  StyledTransitionGroup
} from './style';

const BodyLayout = ({ BodyComponent, location }) => (
  <StyledCenteringDiv>
    <StyledMain>
      <StyledTransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={{
            enter: styles['fade-enter'],
            enterActive: styles['fade-enter-active'],
            exit: styles['fade-exit'],
            exitActive: styles['fade-exit-active']
          }}
        >
          <StyledSection>{BodyComponent}</StyledSection>
        </CSSTransition>
      </StyledTransitionGroup>
    </StyledMain>
  </StyledCenteringDiv>
);

export default withRouter(BodyLayout);
