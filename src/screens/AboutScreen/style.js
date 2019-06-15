import { css } from 'emotion';

import colors from '../../style/colors';

export const ulStyle = css`
  list-style: none;
  padding: 0px;
`;

export const liStyle = css`
  margin: 4px;
  font-size: 24px;
`;

export const aStyle = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline;
  margin: 2px;
  padding: 0px;
  text-decoration: none;
  color: ${colors.CYAN};

  :hover {
    text-decoration: underline;
  }
`;

export const pStyle = css`
  font-size: 24px;
`;
