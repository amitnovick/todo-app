import styled from 'styled-components';
import { css } from 'emotion';

const buttonHoverPopAnimation = `
transform: translateY(-0.25em);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
`;

const linkStyle = `
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 0.1em;
  border-radius: 0.5em;
  border: 1px solid;
  padding: 16px 24px;
  margin: 1em 1em 1em 0;

  :after {
    content: "▶";
    padding-left: 0.5em;
  }
  display: inline-block;
`;

const mobileBreakpoint = 1024;

const mobileMediaQueryKey = `@media (max-width: ${mobileBreakpoint}px)`;
const desktopMediaQueryKey = `@media (min-width: ${mobileBreakpoint + 1}px)`;

export const gridCreatorDivStyle = css`
  text-align: center;
  display: grid;
  width: 100%;
  ${mobileMediaQueryKey} {
    height: auto;
    grid-template-rows: 1vh minmax(5em, 35vh) 4vh minmax(30em, 50vh);
    grid-template-columns: 1fr;
    grid-template-areas: '.' 'splash' '.' 'cta';
  }

  ${desktopMediaQueryKey} {
    height: 90vh;
    min-height: 450px;
    grid-template-rows: 15vh auto 15vh;
    grid-template-columns: 5vw 1fr 1fr 5vw;
    grid-template-areas: '. . . .' '. splash cta .' '. . . .';
  }
`;

export const gridAreaSplashDivStyle = css`
  grid-area: splash;
  align-self: center;
`;

export const imgStyle = css`
  height: 100%;

  ${mobileMediaQueryKey} {
    max-height: 35vh;
  }

  ${desktopMediaQueryKey} {
    max-height: 45vh;
  }
`;

export const gridAreaCtaDivStyle = css`
  grid-area: cta;
  align-self: center;
`;

export const pitchFirstHeaderH2Style = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

export const pitchSecondHeaderH2Style = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
`;

export const pitchThirdHeaderH3Style = css`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1.3em;
`;

export const StyledPitchThirdHeaderH3 = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1.3em;
`;

const semanticUiTeal = '#008080';

export const primaryLinkStyle = css`
${linkStyle}
background-color: ${semanticUiTeal};
color: white;

:hover {
  ${buttonHoverPopAnimation}
  color: white;
}
`;

export const secondaryLinkStyle = css`
  ${linkStyle}
  background-color: white;
  color: ${semanticUiTeal};

  :hover {
    ${buttonHoverPopAnimation}
  }
`;
