import styled from "styled-components";
import Button from "../../styles/Button.js";

export default styled(Button)`
  /* .todo-list li .destroy */
  display: ${props => {
    if (props.liIsHovered) return "block";
    return "none";
  }};
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: ${props => {
    if (props.buttonIsHovered) return "#af5b5e";
    return "#cc9a9a";
  }};
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
`;
