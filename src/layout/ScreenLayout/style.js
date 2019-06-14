import { css } from 'emotion';

export const transitionFadeAppear = css`
  opacity: 0.01;
  z-index: 1;
`;

export const transitionFadeAppearActive = css`
  opacity: 1;
  transition: opacity 300ms ease-in;
`;
