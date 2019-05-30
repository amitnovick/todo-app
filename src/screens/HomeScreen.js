/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

import sharedRoutes from '../routes/sharedRoutes';
import clipboardLogo from '../assets/Clipboard-check.svg';

const semanticUiTeal = '#008080';

const buttonHoverPopAnimation = {
  transform: 'translateY(-0.25em)',
  WebkitBoxShadow: '0px 5px 40px -10px rgba(0,0,0,0.57)'
};

const linkStyle = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: '1em',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
  borderRadius: '0.5em',
  border: '1px solid',
  padding: '16px 24px',
  margin: '1em 1em 1em 0',
  ':after': { content: "'▶'", paddingLeft: '0.5em' },
  display: 'inline-block'
};

const mobileBreakpoint = 1024;

const mobileMediaQueryKey = `@media (max-width: ${mobileBreakpoint}px)`;
const desktopMediaQueryKey = `@media (min-width: ${mobileBreakpoint + 1}px)`;

const HomeScreen = () => (
  <div
    css={{
      textAlign: 'center',
      display: 'grid',
      width: '100%',
      [mobileMediaQueryKey]: {
        height: 'auto',
        gridTemplateRows: '1vh minmax(5em, 35vh) 4vh minmax(30em, 50vh)',
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"." "splash" "." "cta"'
      },
      [desktopMediaQueryKey]: {
        height: '90vh',
        minHeight: '450px',
        gridTemplateRows: '15vh auto 15vh',
        gridTemplateColumns: '5vw 1fr 1fr 5vw',
        gridTemplateAreas: '". . . ." ". splash cta ." ". . . ."'
      }
    }}
  >
    <div css={{ gridArea: 'splash', alignSelf: 'center' }}>
      <img
        src={clipboardLogo}
        alt="clipboard_logo"
        css={{
          height: '100%',
          [mobileMediaQueryKey]: { maxHeight: '35vh' },
          [desktopMediaQueryKey]: { maxHeight: '45vh' }
        }}
      />
    </div>
    <div css={{ gridArea: 'cta', alignSelf: 'center' }}>
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
          ...linkStyle,
          backgroundColor: semanticUiTeal,
          color: 'white',
          ':hover': {
            ...buttonHoverPopAnimation,
            color: 'white'
          }
        }}
      >
        GET STARTED
      </Link>
      <Link
        to={sharedRoutes.FEATURES}
        color="teal"
        css={{
          ...linkStyle,
          backgroundColor: 'white',
          color: semanticUiTeal,
          ':hover': {
            ...buttonHoverPopAnimation
          }
        }}
      >
        LEARN MORE
      </Link>
    </div>
  </div>
);

export default HomeScreen;
