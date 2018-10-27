import styled from "styled-components";
import Button from "../styles/Button.js";

export default styled(Button)`
  /* .todo-list li .destroy */
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  /* .todo-list li .destroy:hover */
  :hover {
    color: #af5b5e;
  }

  /* .todo-list li .destroy:after */
  :after {
    content: "×";
  }
`;
