import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";

export const StyledMain = styled.main`
  min-width: 230px;
  max-width: 550px;
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
