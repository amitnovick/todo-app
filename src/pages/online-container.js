/**
 * External dependencies
 */
import React, { Component } from "react";
/**
 * Internal dependencies
 */
import {
  uploadServerCreateTodo,
  downloadServerReadTodos,
  uploadServerUpdateTodo,
  uploadServerToggleTodo,
  uploadServerDeleteTodo
} from "../lib/rest-endpoint.js";
import TodoList from "../components/online/todo-list/index.js";
import CreateTodoTextbox from "../components/online/create-todo-textbox/index.js";
import LoginModal from "../components/online/login-modal/index.js";
/**
 *  Style dependencies
 */
import "./style.css";

const todoUIparamCreate = "isLoadingCreate";
const todoUIparamUpdate = "isLoadingUpdate";
const todoUIparamToggle = "isLoadingToggle";
const todoUIparamDelete = "isLoadinDelete";
// const todoDataParams = ["id", "title", "completed"];
const todoUIParams = [
  // for specific todo items
  todoUIparamCreate,
  todoUIparamUpdate,
  todoUIparamToggle,
  todoUIparamDelete
];

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isTodosUIparamRead: false,
      isThereCommunicationProblem: false,
      modalIsOpen: false
    };

    this.createTodo = this.createTodo.bind(this);
    this.readTodos = this.readTodos.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  createTodo(title) {
    const shouldCreateNewTodo = title.length > 0;
    if (shouldCreateNewTodo) {
      // const todosAfterStartLoad = this.changeLoading(
      //   todo,
      //   todoUIparamCreate,
      //   true
      // );
      // this.setState({ todos: todosAfterStartLoad });
      uploadServerCreateTodo(title)
        .then(res => {
          // const todosAfterStopLoad = this.changeLoading(
          //   todo,
          //   todoUIparamCreate,
          //   false
          // );
          const todosAfterStopLoad = this.state.todos; // dummy variable
          const todoData = res.data; // { 'id':..., 'title':..., 'completed':... }
          const todoUIParamsObject = this.generateTodoUIParamsObject();
          const todo = { ...todoData, ...todoUIParamsObject };
          const newTodos = todosAfterStopLoad.concat([todo]);
          this.setState({ todos: newTodos });
        })
        .catch(err => {
          console.log(err);
          this.setState({ isThereCommunicationProblem: true });
        });
    }
  }

  generateTodoUIParamsObject() {
    return todoUIParams.reduce((accuObj, item) => {
      return { ...accuObj, [item]: false };
    }, {});
  }

  readTodos() {
    this.setState({ isTodosUIparamRead: false });
    const that = this;
    downloadServerReadTodos()
      .then(res => {
        const todosData = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
        // Extend the todosData objects with UI parameters, result in Todo objects

        const todos = todosData.map(todoData => {
          const todoUIParamsObject = that.generateTodoUIParamsObject();
          return { ...todoData, ...todoUIParamsObject };
        });
        that.setState({ todos: todos, isTodosUIparamRead: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isThereCommunicationProblem: true });
      });
  }

  updateTodo(todo, newTitle) {
    const todosAfterStartLoad = this.changeLoading(
      todo,
      todoUIparamUpdate,
      true
    );
    this.setState({ todos: todosAfterStartLoad });
    uploadServerUpdateTodo(todo, newTitle)
      .then(res => {
        const todosAfterStopLoad = this.changeLoading(
          todo,
          todoUIparamUpdate,
          false
        );
        const updatedTodoData = res.data; // { 'id':..., 'title':..., 'completed':... }
        const todoUIParamsObject = this.generateTodoUIParamsObject();
        const updatedTodo = { ...updatedTodoData, ...todoUIParamsObject };
        const newTodos = todosAfterStopLoad.map(t => {
          return t.id === todo.id ? updatedTodo : t;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isThereCommunicationProblem: true });
      });
  }

  toggleTodo(todo) {
    const todosAfterStartLoad = this.changeLoading(
      todo,
      todoUIparamToggle,
      true
    );
    this.setState({ todos: todosAfterStartLoad });
    uploadServerToggleTodo(todo)
      .then(res => {
        const todosAfterStopLoad = this.changeLoading(
          todo,
          todoUIparamToggle,
          false
        );
        const updatedTodoData = res.data; // { 'id':..., 'title':..., 'completed':... }
        const todoUIParamsObject = this.generateTodoUIParamsObject();
        const updatedTodo = { ...updatedTodoData, ...todoUIParamsObject };
        const newTodos = todosAfterStopLoad.map(t => {
          return t.id === todo.id ? updatedTodo : t;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isThereCommunicationProblem: true });
      });
  }

  deleteTodo(todo) {
    const todosAfterStartLoad = this.changeLoading(
      todo,
      todoUIparamDelete,
      true
    );
    this.setState({ todos: todosAfterStartLoad });
    uploadServerDeleteTodo(todo)
      .then(() => {
        const todosAfterStopLoad = this.changeLoading(
          todo,
          todoUIparamDelete,
          false
        );
        const newTodos = todosAfterStopLoad.filter(t => {
          return t.id !== todo.id;
        });
        this.setState({ todos: newTodos });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isThereCommunicationProblem: true });
      });
  }

  /**
   * Return a new collection of Todo objects wherein a todoUIparam of a Todo object is to be changed
   * @param {Object} todo A Todo object
   * @param {String} type One of todoUIParams
   * @param {Boolean} newValue true implies startLoading, false implies stopLoading
   */
  changeLoading(todo, type, newValue) {
    const newTodo = { ...todo, [type]: newValue };
    const newTodos = this.state.todos.map(t => {
      return t.id === todo.id ? newTodo : t;
    });
    return newTodos;
  }

  componentDidMount() {
    this.readTodos();
    this.toggleModal();
  }

  render() {
    const {
      todos,
      isTodosUIparamRead,
      isThereCommunicationProblem
    } = this.state;
    const indicatorPendingResponse = (
      <label>{"Initial loading in progress..."}</label>
    );
    const indicatorConfirmedCommunicationProblem = (
      <label>{"Connection problem"}</label>
    );
    const indicatorNoCommunicationProblem = <label>{"✌ No problems"}</label>;
    return (
      <div className="todoapp">
        <LoginModal
          modalIsOpen={this.state.modalIsOpen}
          toggleModal={() => this.toggleModal()}
        />
        <CreateTodoTextbox createTodo={title => this.createTodo(title)} />
        <TodoList
          todos={todos}
          onDestroy={todo => this.deleteTodo(todo)}
          onReplaceTitle={(todo, title) => this.updateTodo(todo, title)}
          onToggle={todo => this.toggleTodo(todo)}
        />
        {isTodosUIparamRead ? null : indicatorPendingResponse}
        {isThereCommunicationProblem
          ? indicatorConfirmedCommunicationProblem
          : indicatorNoCommunicationProblem}
      </div>
    );
  }
}

export default AppContainer;
