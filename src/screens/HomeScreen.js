/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';

import sharedRoutes from '../routes/sharedRoutes';
import clipboardLogo from '../assets/Clipboard-check.svg';

const semanticUiTeal = '#008080';

const buttonHoverPopAnimation = {
  transform: 'translateY(-0.25em)',
  WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)'
};

const HomeScreen = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={clipboardLogo} alt="clipboard_logo" style={{ width: '100%' }} />
    <h2
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      }}
    >
      Get Things Done
    </h2>
    <h2 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
      One step at a time
    </h2>
    <h3
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 400,
        fontSize: '1.3em'
      }}
    >
      Notes are stored on the cloud and go wherever you go.
    </h3>
    <Link
      to={sharedRoutes.APP}
      color="teal"
      css={{
        backgroundColor: semanticUiTeal,
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1em',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        borderRadius: '0.5em',
        border: '1px solid',
        padding: '16px 24px',
        color: 'white',
        ':after': { content: "'▶'", paddingLeft: '0.5em' },
        ':hover': {
          ...buttonHoverPopAnimation,
          color: 'white'
        },
        margin: '1em 1em 1em 0',
        display: 'inline-block'
      }}
    >
      GET STARTED
    </Link>
    <Link
      to={sharedRoutes.FEATURES}
      color="teal"
      css={{
        backgroundColor: 'white',
        color: semanticUiTeal,
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1em',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        borderRadius: '0.5em',
        border: '1px solid',
        padding: '16px 24px',
        ':after': { content: "'▶'", paddingLeft: '0.5em' },
        margin: '1em 1em 1em 0',
        display: 'inline-block',
        ':hover': {
          ...buttonHoverPopAnimation
        }
      }}
    >
      LEARN MORE
    </Link>
  </div>
);

export default HomeScreen;
