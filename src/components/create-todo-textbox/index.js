import React from "react";

import CreateTodoTextbox from "./presentational.js";

const ENTER_KEY = 13;

class CreateTodoTextboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: ""
    };
  }

  handleNewTitleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleNewTitleKeyDown = event => {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) return;

    const newTitleValue = this.state.newTitle.trim();
    this.props.createTodo(newTitleValue);
    this.setState({ newTitle: "" });
  };

  render() {
    return (
      <CreateTodoTextbox
        {...this.props}
        {...this.state}
        handleNewTitleChange={this.handleNewTitleChange}
        handleNewTitleKeyDown={this.handleNewTitleKeyDown}
      />
    );
  }
}

export default CreateTodoTextboxContainer;
