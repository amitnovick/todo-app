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
/* Styled components */
import DeleteButton from "./styles/DeleteButton.js";
import EditTitleTextbox from "./styles/EditTitleTextbox.js";
import StyledTodoListItem from "./styles/StyledTodoListItem.js";
import ToggleCompleteCheckbox from "./styles/ToggleCompleteCheckbox.js";
import TitleText from "./styles/TitleText.js";
import ListItemControlsWrapper from "./styles/ListItemControlsWrapper.js";

library.add(faSpinner);
const editTitleField = "editTitleField";
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: this.props.todo.title,
      liIsHovered: false, // Styling-purposed state
      buttonIsHovered: false // Styling-purposed state
    };
  }

  handleToggleButtonIsHovered() {
    this.setState({ buttonIsHovered: !this.state.buttonIsHovered });
  }

  handleToggleLiIsHovered() {
    this.setState({ liIsHovered: !this.state.liIsHovered });
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
          <EditTitleTextbox
            ref={editTitleField}
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
        <ListItemControlsWrapper isBeingEdited={isBeingEdited}>
          <ToggleCompleteCheckbox
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle()}
          />
          <TitleText
            onDoubleClick={() => this.handleTitleClick()}
            isCompleted={todo.completed}
          >
            {todo.title + " "}
          </TitleText>
          <DeleteButton
            onClick={() => this.props.onDestroy()}
            liIsHovered={liIsHovered}
            buttonIsHovered={buttonIsHovered}
            onMouseEnter={() => this.handleToggleButtonIsHovered()}
            onMouseLeave={() => this.handleToggleButtonIsHovered()}
          >
            {"×"}
          </DeleteButton>
        </ListItemControlsWrapper>
      );
    }
    return (
      <StyledTodoListItem
        isLastChild={isLastChild}
        isBeingEdited={isBeingEdited}
        onMouseEnter={() => this.handleToggleLiIsHovered()}
        onMouseLeave={() => this.handleToggleLiIsHovered()}
      >
        {content}
      </StyledTodoListItem>
    );
  }
}

export default TodoListItem;
