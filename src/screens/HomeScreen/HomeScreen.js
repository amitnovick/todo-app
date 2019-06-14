import React from 'react';
import { Link } from 'react-router-dom';

import sharedRoutes from '../../routes/sharedRoutes';
import clipboardLogo from '../../assets/Clipboard-check.svg';
import {
  gridCreatorDivStyle,
  gridAreaSplashDivStyle,
  imgStyle,
  gridAreaCtaDivStyle,
  pitchFirstHeaderH2Style,
  pitchSecondHeaderH2Style,
  pitchThirdHeaderH3Style,
  primaryLinkStyle,
  secondaryLinkStyle
} from './style';

const HomeScreen = () => (
  <div className={gridCreatorDivStyle}>
    <div className={gridAreaSplashDivStyle}>
      <img className={imgStyle} src={clipboardLogo} alt="clipboard_logo" />
    </div>
    <div className={gridAreaCtaDivStyle}>
      <h2 className={pitchFirstHeaderH2Style}>Get Things Done</h2>
      <h2 className={pitchSecondHeaderH2Style}>One step at a time</h2>
      <h3 className={pitchThirdHeaderH3Style}>
        Notes are stored on the cloud and go wherever you go.
      </h3>
      <Link className={primaryLinkStyle} to={sharedRoutes.APP}>
        GET STARTED
      </Link>
      <Link className={secondaryLinkStyle} to={sharedRoutes.FEATURES}>
        LEARN MORE
      </Link>
    </div>
  </div>
);

export default HomeScreen;
