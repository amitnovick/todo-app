import styled from 'styled-components';

import colors from '../../colors';

export const StyledUl = styled.ul`
  list-style: none;
  padding: 0px;
`;

export const StyledLi = styled.li`
  margin: 4px;
  font-size: 24px;
`;

export const StyledAnchor = styled.a`
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

export const StyledP = styled.p`
  font-size: 24px;
`;
