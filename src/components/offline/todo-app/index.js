/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import TodoList from "../todo-list/index.js";
import CreateTodoTextbox from "../create-todo-textbox/index.js";
import LoginModal from "../login-modal/index.js";
/**
 *  Style dependencies
 */
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  componentDidMount() {
    this.toggle();
  }

  render = () => {
    const {
      todos,
      createTodo,
      replaceTodoTitle,
      destroyTodo,
      toggleTodo
    } = this.props;
    let app = null;
    let main = null;
    let newTodoBarContent = null;
    main =
      todos.length > 0 ? (
        <TodoList
          todos={todos}
          onDestroy={todoID => destroyTodo(todoID)}
          replaceTitle={(todo, title) => replaceTodoTitle(todo, title)}
          onToggle={todo => toggleTodo(todo)}
        />
      ) : null;
    newTodoBarContent = (
      <CreateTodoTextbox createTodo={title => createTodo(title)} />
    );
    app = (
      <div className="todoapp">
        <LoginModal
          modalIsOpen={this.state.modalIsOpen}
          toggle={() => this.toggle()}
        />
        {newTodoBarContent}
        {main}
      </div>
    );
    return app;
  };
}

export default App;
