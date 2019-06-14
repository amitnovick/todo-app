import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import BodyLayout from '../BodyLayout/BodyLayout';
import { transitionFadeAppear, transitionFadeAppearActive } from './style';

const ScreenLayout = ({ BodyComponent, HeaderComponent }) => (
  <TransitionGroup>
    <CSSTransition
      classNames={{
        appear: transitionFadeAppear,
        appearActive: transitionFadeAppearActive
      }}
      appear={true}
      timeout={300}
    >
      <div>
        {HeaderComponent}
        <BodyLayout BodyComponent={BodyComponent} />
      </div>
    </CSSTransition>
  </TransitionGroup>
);

export default ScreenLayout;
