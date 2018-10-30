/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import ListItem from "../ListItem/index.js";
import Section from "./Section.js";
import Ul from "./Ul.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleEditItemID: null
    };

    this.deactivateTitleEditMode = this.deactivateTitleEditMode.bind(this);
  }

  replaceTitle(todoToSave, text) {
    this.props.replaceTitle(todoToSave, text);
    this.deactivateTitleEditMode();
  }

  activateTitleEditMode(todo) {
    this.setState({
      titleEditItemID: todo.id
    });
  }

  deactivateTitleEditMode() {
    this.setState({
      titleEditItemID: null
    });
  }

  /* Utility method */
  isLastChild(i, arr) {
    return i === arr.length - 1;
  }

  render() {
    const { todos, loadingItemIDs, onToggle } = this.props;
    const { titleEditItemID } = this.state;
    return (
      <Section className="main">
        <Ul className="todo-list">
          {todos.map((todo, i, arr) => (
            <ListItem
              key={todo.id}
              todo={todo}
              isBeingEdited={titleEditItemID === todo.id}
              replaceTitle={title => this.replaceTitle(todo, title)}
              onTitleClick={() => this.activateTitleEditMode(todo)}
              onDestroy={() => this.props.onDestroy(todo.id)}
              onCancelTitleEdit={() => this.deactivateTitleEditMode()}
              isLoading={loadingItemIDs.includes(todo.id)}
              onToggle={() => onToggle(todo)}
              isLastChild={this.isLastChild(i, arr)}
            />
          ))}
        </Ul>
      </Section>
    );
  }
}

export default App;
