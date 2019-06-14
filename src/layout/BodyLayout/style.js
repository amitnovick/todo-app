import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
const mobileBreakpoint = 700;

const mobileMediaQueryKey = `@media screen and (max-width: ${mobileBreakpoint}px)`;

const desktopMediaQueryKey = `@media screen and (min-width: ${mobileBreakpoint +
  1}px)`;

export const StyledCenteringDiv = styled.div`
  ${mobileMediaQueryKey} {
    padding-left: 13.5%;
    padding-right: 13.5%;
  }

  ${desktopMediaQueryKey} {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`;

export const StyledMain = styled.main`
  margin: 0 auto;
  padding: 0;
`;

export const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
`;

export const StyledSection = styled.section`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;
