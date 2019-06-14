import { css } from 'emotion';

const mobileBreakpoint = 700;

const mobileMediaQueryKey = `@media screen and (max-width: ${mobileBreakpoint}px)`;

const desktopMediaQueryKey = `@media screen and (min-width: ${mobileBreakpoint +
  1}px)`;

export const centeredDivStyle = css`
  ${mobileMediaQueryKey} {
    padding-left: 13.5%;
    padding-right: 13.5%;
  }

  ${desktopMediaQueryKey} {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`;

export const mainStyle = css`
  margin: 0 auto;
  padding: 0;
`;

export const transitionGroupStyle = css`
  position: relative;
`;

export const sectionStyle = css`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

export const transitionFadeEnter = css`
  opacity: 0.01;
  z-index: 1;
`;

export const transitionFadeEnterActive = css`
  opacity: 1;
  transition: opacity 300ms ease-in;
`;

export const transitionFadeExit = css`
  opacity: 1;
`;

export const transitionFadeExitActive = css`
  opacity: 0.01;
  transition: opacity 300ms ease-in;
`;
