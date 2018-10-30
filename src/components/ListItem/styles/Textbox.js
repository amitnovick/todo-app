import styled from "styled-components";
import Textbox from "../../styles/Textbox.js";

export default styled(Textbox)`
  /* .todo-list li .edit */
  display: none;
  display: ${props => (props.isBeingEdited ? "block" : "{}")};
  width: ${props => (props.isBeingEdited ? "506px" : "{}")};
  padding: ${props => (props.isBeingEdited ? "12px 16p" : "{}")};
  margin: ${props => (props.isBeingEdited ? "0 0 0 43px" : "{}")};
`;
