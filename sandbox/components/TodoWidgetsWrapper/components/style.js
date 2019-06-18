import { css } from 'emotion';
import colors from '../../../../src/style/colors';
import wrapperRadius from '../wrapperRadius';
import { darken } from 'polished';

const inputRadius = 3;

const borderColor = darken(0.1, colors.CYAN);

const myStyle = `
outline: ${inputRadius}px solid ${
  colors.CYAN
}; /* TODO: This one is too wide! make it narrow */
&:focus {
  outline: ${inputRadius}px solid ${borderColor};
}
`;

export const inputStyle = css`
  ${myStyle}
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 16px 16px 16px 60px;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

  ::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;
