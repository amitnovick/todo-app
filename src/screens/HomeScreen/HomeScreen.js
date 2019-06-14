import React from 'react';

import sharedRoutes from '../../routes/sharedRoutes';
import clipboardLogo from '../../assets/Clipboard-check.svg';
import {
  StyledScreenDiv,
  StyledImgGridAreaDiv,
  StyledImg,
  StyledPitchHeadersGridAreaDiv,
  StyledPitchFirstHeaderH2,
  StyledPitchSecondHeaderH2,
  StyledPitchThirdHeaderH3,
  StyledPrimaryLink,
  StyledSecondaryLink
} from './style';

const HomeScreen = () => (
  <StyledScreenDiv>
    <StyledImgGridAreaDiv>
      <StyledImg src={clipboardLogo} alt="clipboard_logo" />
    </StyledImgGridAreaDiv>
    <StyledPitchHeadersGridAreaDiv>
      <StyledPitchFirstHeaderH2>Get Things Done</StyledPitchFirstHeaderH2>
      <StyledPitchSecondHeaderH2>One step at a time</StyledPitchSecondHeaderH2>
      <StyledPitchThirdHeaderH3>
        Notes are stored on the cloud and go wherever you go.
      </StyledPitchThirdHeaderH3>
      <StyledPrimaryLink to={sharedRoutes.APP}>GET STARTED</StyledPrimaryLink>
      <StyledSecondaryLink to={sharedRoutes.FEATURES}>
        LEARN MORE
      </StyledSecondaryLink>
    </StyledPitchHeadersGridAreaDiv>
  </StyledScreenDiv>
);

export default HomeScreen;
