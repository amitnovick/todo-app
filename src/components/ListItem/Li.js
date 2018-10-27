import styled from "styled-components";

export default styled.li`
  /* .todo-list li */
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  /* .todo-list li:last-child */
  :last-child {
    border-bottom: none;
  }
`;
