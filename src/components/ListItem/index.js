/**
 * External dependencies
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/**
 * Internal dependencies
 */
import { ESCAPE_KEY, ENTER_KEY } from "../../constants/index.js";
import Button from "./Button.js";
import Textbox from "./Textbox.js";
import Li from "./Li.js";
import Checkbox from "./Checkbox.js";
import Label from "./Label.js";
import Div from "./Div.js";

library.add(faSpinner);

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: this.props.todo.title,
      liIsHovered: false, // Styling-purposed state
      buttonIsHovered: false // Styling-purposed state
    };
  }

  buttonHandleMouseEnter() {
    this.setState({ buttonIsHovered: true });
  }

  buttonHandleMouseLeave() {
    this.setState({ buttonIsHovered: false });
  }

  liHandleMouseEnter() {
    this.setState({ liIsHovered: true });
  }

  liHandleMouseLeave() {
    this.setState({ liIsHovered: false });
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
    this.setState({ editTitle: this.props.todo.title });
    this.props.onTitleClick();
  }

  replaceTitle() {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length === 0) this.props.onDestroy();
    else if (editTitleValue !== this.props.todo.title) {
      this.props.replaceTitle(editTitleValue);
      this.setState({ editTitle: "" });
    } else this.cancelTitleEdit();
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
    const {
      todo,
      isLoading,
      isBeingEdited,
      onToggle,
      isLastChild
    } = this.props;
    const { editTitle, liIsHovered, buttonIsHovered } = this.state;
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
            onBlur={() => this.replaceTitle()}
            type="text"
            placeholder="Edited value for todo"
            isBeingEdited={isBeingEdited}
          />
        </div>
      );
    } else {
      content = (
        <Div className="view" isBeingEdited={isBeingEdited}>
          <Checkbox
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle()}
          />
          <Label
            onDoubleClick={() => this.handleTitleClick()}
            isCompleted={todo.completed}
          >
            {todo.title + " "}
          </Label>
          <Button
            className="destroy"
            onClick={() => this.props.onDestroy()}
            liIsHovered={liIsHovered}
            buttonIsHovered={buttonIsHovered}
            onMouseEnter={() => this.buttonHandleMouseEnter()}
            onMouseLeave={() => this.buttonHandleMouseLeave()}
          >
            {"×"}
          </Button>
        </Div>
      );
    }
    return (
      <Li
        isLastChild={isLastChild}
        isBeingEdited={isBeingEdited}
        onMouseEnter={() => this.liHandleMouseEnter()}
        onMouseLeave={() => this.liHandleMouseLeave()}
      >
        {content}
      </Li>
    );
  }
}

export default ListItem;
