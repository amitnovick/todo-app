import React, { Component } from 'react';
import axios from 'axios';
import {
  API_URL,
  SLASH,
  TODO_TITLE,
  TODO_ID,
  TODO_COMPLETED,
} from './constants/index.js';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        todos: [],
        inputCreateTodoValue: '',
        inputUpdateTodoValue: '', // only needed for debugging API interop
      };

      this.createTodo = this.createTodo.bind(this);
      this.updateInputCreateTodoValue = this.updateInputCreateTodoValue.bind(this);
      this.updateInputUpdateTodoValue = this.updateInputUpdateTodoValue.bind(this);
    }
 
    componentDidMount() {
      this.readTodos();
    }

    createTodo() {
      if (this.state.inputCreateTodoValue.length > 0) {
        const params = new URLSearchParams();
        params.append([TODO_TITLE], this.state.inputCreateTodoValue);
        params.append([TODO_COMPLETED], 'false');

        axios
          .post(API_URL, params)
          .then(res => {
            if (res.status === 201){
              const todo = res.data; // { 'id':..., 'title':..., 'completed':... }
              const newTodos = this.state.todos.concat([todo]);
              this.setState({ todos: newTodos });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    readTodos() {
      axios
        .get(API_URL)
        .then(res => {
          const todos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
          this.setState( { todos: todos });
        })
        .catch(err => {
          console.log(err);
        });
    }

    updateTodo(itemId) {
      const params = new URLSearchParams();
      params.append([TODO_TITLE], this.state.inputUpdateTodoValue);

      axios
        .put(API_URL + itemId.toString() + SLASH, params)
        .then(res => {
          if (res.status === 200) {
            const replaceTodoById = (todo) => {
              if (todo.id === itemId) {
                return {
                  [TODO_ID]: todo.id,
                  [TODO_TITLE]: this.state.inputUpdateTodoValue,
                  [TODO_COMPLETED]: todo.completed,
                };
              }
              return todo;
            }
            const newTodos = this.state.todos.map(replaceTodoById);
            this.setState({ todos: newTodos });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    deleteTodo(itemId) {
      axios
        .delete(API_URL + itemId.toString() + SLASH)
        .then(res => {
          if (res.status === 204) {
            const isNotId = (todo) => todo.id !== itemId;
            const newTodos = this.state.todos.filter(isNotId);
            this.setState({ todos: newTodos });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    updateInputCreateTodoValue(event) {
      this.setState({ inputCreateTodoValue: event.target.value });
    }

    updateInputUpdateTodoValue(event) {
      this.setState({ inputUpdateTodoValue: event.target.value });
    }

    render() {
      const { todos, inputCreateTodoValue, inputUpdateTodoValue } = this.state;
      return (
        <div>
          <button onClick={this.createTodo}>
            {'+'}
          </button>
          <input
            value={inputCreateTodoValue}
            onChange={this.updateInputCreateTodoValue}
            type='text'
            placeholder='Enter your task here...'
          />
          <input
            value={inputUpdateTodoValue}
            onChange={this.updateInputUpdateTodoValue}
            type='text'
            placeholder='Edited value for todo'
          />
          <TodoTable 
            todosList={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            that={this}
          />
        </div>
      );
    }
}

class TodoTable extends Component {
  render() {
    const { todosList, updateTodo, deleteTodo, that } = this.props;
    return (
      <div>
      {
        todosList.map( todo => 
          <div key={todo.id}>
            <span>{todo.completed.toString()+' '}</span>
            <label>{todo.title+' '}</label>
            <button onClick={updateTodo.bind(that, todo.id)}>
              {'Update'}
            </button>
            <button onClick={deleteTodo.bind(that, todo.id)}>
              {'X'}
            </button>
          </div>
        )
      }
      </div>
    );
  }
}

export default App;