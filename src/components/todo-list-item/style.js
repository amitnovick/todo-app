import styled from "styled-components";

/**
 * Base styled components
 */
const Button = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Input = styled.input`
  /* .todoapp input::-webkit-input-placeholder */
  ::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  /* .todoapp input::-moz-placeholder */
  ::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  /* .todoapp input::input-placeholder */
  ::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;

/**
 * Customized styled components
 */
export const DeleteButton = styled(Button)`
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
const Textbox = styled(Input)`
  /* .new-todo,.edit */
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const EditTitleTextbox = styled(Textbox)`
  /* .todo-list li .edit */
  display: none;
  display: ${props => (props.isBeingEdited ? "block" : "{}")};
  width: ${props => (props.isBeingEdited ? "506px" : "{}")};
  padding: ${props => (props.isBeingEdited ? "12px 16p" : "{}")};
  margin: ${props => (props.isBeingEdited ? "0 0 0 43px" : "{}")};
`;

export const ListItemControlsWrapper = styled.div`
  display: ${props => (props.isBeingEdited ? "none" : "{}")};
`;

export const StyledTodoListItem = styled.li`
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

export const TitleText = styled.label`
  background-image: ${props => {
    if (props.isCompleted)
      return "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')";
    return "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')";
  }};
  background-repeat: no-repeat;
  background-position: center left;

  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;

  color: ${props => (props.isCompleted ? "#d9d9d9" : "{}")}
  text-decoration: ${props => (props.isCompleted ? "line" : "{}")}
`;

export const ToggleCompleteCheckbox = styled(Input)`
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
`;
