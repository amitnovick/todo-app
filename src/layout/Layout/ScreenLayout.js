import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import styles from './style.module.css';

const centerContentStyle = {
  margin: '0 auto',
  minWidth: 230,
  maxWidth: 550
};

const ScreenLayout = ({ BodyComponent, HeaderComponent, location }) => (
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
        <div style={centerContentStyle}>
          <main className={styles['main-1']}>
            <TransitionGroup className={styles['transition-group-1']}>
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
                <section className={styles['section-1']}>
                  {BodyComponent}
                </section>
              </CSSTransition>
            </TransitionGroup>
          </main>
        </div>
      </div>
    </CSSTransition>
  </TransitionGroup>
);

const ScreenLayoutContainer = withRouter(ScreenLayout);

export default ScreenLayoutContainer;
