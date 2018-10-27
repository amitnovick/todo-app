import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { ESCAPE_KEY, ENTER_KEY } from "../../constants/index.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.js";
import Textbox from "./Textbox.js";
import Li from "./Li.js";

library.add(faSpinner);

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: ""
    };

    this.cancelTitleEdit = this.cancelTitleEdit.bind(this);
  }

  handleEditTitleTextChange(event) {
    this.setState({ editTitle: event.target.value });
  }

  handleEditTitleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.cancelTitleEdit();
    } else if (event.which === ENTER_KEY) {
      this.replaceTitle();
    }
  }

  handleTitleClick() {
    this.props.onTitleClick();
  }

  handleDestroyClick() {
    this.props.onDestroyClick();
  }

  replaceTitle() {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length > 0) {
      this.props.replaceTitle(editTitleValue);
      this.setState({ editTitle: "" });
    }
  }

  cancelTitleEdit() {
    this.props.onCancelTitleEdit();
    this.setState({ editTitle: this.props.todo.title });
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `this.props.onTitleClick()` in the `handleTitleClick` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.isBeingEdited && this.props.isBeingEdited) {
      const node = ReactDOM.findDOMNode(this.refs.editTitleField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  render() {
    const { todo, isLoading, isBeingEdited, onToggle } = this.props;
    const { editTitle } = this.state;
    let content;
    if (isLoading) {
      content = (
        <div key={todo.id}>
          <FontAwesomeIcon icon="spinner" pulse />
        </div>
      );
    } else if (isBeingEdited) {
      content = (
        <div key={todo.id}>
          <Textbox
            className="edit"
            ref="editTitleField"
            value={editTitle}
            onChange={event => this.handleEditTitleTextChange(event)}
            onKeyDown={event => this.handleEditTitleKeyDown(event)}
            type="text"
            placeholder="Edited value for todo"
          />
        </div>
      );
    } else {
      content = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle()}
          />
          <label onDoubleClick={() => this.handleTitleClick()}>
            {todo.title + " "}
          </label>
          <Button
            className="destroy"
            onClick={() => this.handleDestroyClick()}
          />
        </div>
      );
    }
    return (
      <Li
        className={classNames({
          completed: todo.completed,
          editing: isBeingEdited
        })}
      >
        {content}
      </Li>
    );
  }
}

export default ListItem;

// const StyledCheckbox = styled.input`
//   // .todo-list li .toggle
//   .todo-list li .toggle {
//   text-align: center;
//   width: 40px;
//   /* auto, since non-WebKit browsers doesn't support input styling */
//   height: auto;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   margin: auto 0;
//   border: none; /* Mobile Safari */
//   -webkit-appearance: none;
//   appearance: none;
//   opacity: 0;
//   }
// `;

// const StyledDeleteButton = styled(Button)`
//   display: none;
//   position: absolute;
//   top: 0;
//   right: 10px;
//   bottom: 0;
//   width: 40px;
//   height: 40px;
//   margin: auto 0;
//   font-size: 30px;
//   color: #cc9a9a;
//   margin-bottom: 11px;
//   transition: color 0.2s ease-out;

//   :hover {
//     color: #af5b5e;
//   }

//   :after {
//     content: "×";
//   }
// `;

// const StyledListItem = styled.li`
//   // .todo-list li .toggle
//   .toggle {
//     text-align: center;
//     width: 40px;
//     /* auto, since non-WebKit browsers doesn't support input styling */
//     height: auto;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     margin: auto 0;
//     border: none; /* Mobile Safari */
//     -webkit-appearance: none;
//     appearance: none;
//     opacity: 0;
//   }

//   // .todo-list li
//   position: relative;
//   font-size: 24px;
//   border-bottom: 1px solid #ededed;

//   // .todo-list li:last-child
//   :last-child {
//     border-bottom: none;
//   }

//   //.todo-list li.editing
//   .editing {
//     border-bottom: none;
//     padding: 0;
//   }

//   // .todo-list li.editing .edit
//   .editing .edit {
//     display: block;
//     width: 506px;
//     padding: 12px 16px;
//     margin: 0 0 0 43px;
//   }

//   // .todo-list li.editing .view
//   .editing .view {
//     display: none;
//   }

//   // .todo-list li .toggle
//   .toggle {
//     text-align: center;
//     width: 40px;
//     /* auto, since non-WebKit browsers doesn't support input styling */
//     height: auto;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     margin: auto 0;
//     border: none; /* Mobile Safari */
//     -webkit-appearance: none;
//     appearance: none;
//     opacity: 0;
//   }

//   // .todo-list li .toggle + label
//   /* Firefox requires _#_ to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433 */
//   /* IE and Edge requires *everything* to be escaped to render, so we do that instead of just the _#_ - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/ */
//   .toggle + label {
//     background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
//     background-repeat: no-repeat;
//     background-position: center left;
//   }

//   // .todo-list li .toggle:checked + label
//   .toggle:checked + label {
//     background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
//   }

//   // .todo-list li label
//   label {
//     word-break: break-all;
//     padding: 15px 15px 15px 60px;
//     display: block;
//     line-height: 1.2;
//     transition: color 0.4s;
//   }

//   // .todo-list li.completed label
//   .completed label {
//     color: #d9d9d9;
//     text-decoration: line-through;
//   }

//   // .todo-list li .destroy
//   .destroy {
//     display: none;
//     position: absolute;
//     top: 0;
//     right: 10px;
//     bottom: 0;
//     width: 40px;
//     height: 40px;
//     margin: auto 0;
//     font-size: 30px;
//     color: #cc9a9a;
//     margin-bottom: 11px;
//     transition: color 0.2s ease-out;
//   }

//   // .todo-list li .destroy:hover
//   .destroy:hover {
//     color: #af5b5e;
//   }

//   // .todo-list li .destroy:after
//   .destroy:after {
//     content: "×";
//   }

//   // .todo-list li:hover .destroy
//   :hover .destroy {
//     display: block;
//   }

//   // .todo-list li .edit
//   .edit {
//     display: none;
//   }

//   // .todo-list li.editing:last-child
//   .editing:last-child {
//     margin-bottom: -1px;
//   }
// `;

// const StyledTitleLabel = styled.label`
//   word-break: break-all;
//   padding: 15px 15px 15px 60px;
//   display: block;
//   line-height: 1.2;
//   transition: color 0.4s;
// `;

// const StyledEditTitleField = styled.input`
//   position: relative;
//   margin: 0;
//   width: 100%;
//   font-size: 24px;
//   font-family: inherit;
//   font-weight: inherit;
//   line-height: 1.4em;
//   border: 0;
//   color: inherit;
//   padding: 6px;
//   border: 1px solid #999;
//   box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
//   box-sizing: border-box;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;

//   /* From =.todo-list li .edit=, disabled cuz don't know  how to make visible yet */
//   // display: none;
// `;
