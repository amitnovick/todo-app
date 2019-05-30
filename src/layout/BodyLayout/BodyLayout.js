/** @jsx jsx */
import { jsx } from '@emotion/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import styles from './style.module.css';

const mobileBreakpoint = 700;

const mobileMediaQueryKey = `@media screen and (max-width: ${mobileBreakpoint}px)`;

const desktopMediaQueryKey = `@media screen and (min-width: ${mobileBreakpoint +
  1}px)`;

const centerContentStyle = {
  [mobileMediaQueryKey]: {
    paddingLeft: '13.5%',
    paddingRight: '13.5%'
  },
  [desktopMediaQueryKey]: {
    paddingLeft: '1.5em',
    paddingRight: '1.5em'
  }
};

const mainStyle = {
  // minWidth: '230px',
  // maxWidth: '550px',
  margin: '0 auto',
  padding: '0'
};

const sectionStyle = {
  position: 'absolute',
  width: '100%',
  top: '0',
  left: '0'
};

const transitionGroupStyle = { position: 'relative' };

const BodyLayout = ({ BodyComponent, location }) => (
  <div css={centerContentStyle}>
    <main css={mainStyle}>
      <TransitionGroup css={transitionGroupStyle}>
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
          <section css={sectionStyle}>{BodyComponent}</section>
        </CSSTransition>
      </TransitionGroup>
    </main>
  </div>
);

export default withRouter(BodyLayout);
