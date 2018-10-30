import styled from "styled-components";

export default styled.li`
  /* .todo-list li */
  position: relative;
  font-size: 24px;
  border-bottom: ${props => {
    if (props.isBeingEdited || props.isLastChild) return "none";
    else return "1px solid #ededed";
  }};
  margin-bottom: ${props =>
    props.isBeingEdited && props.isLastChild ? "-1px" : "{}"};
  padding: ${props => (props.isBeingEdited ? "0" : "{}")};
`;
