import React, { Component } from 'react';
import axios from 'axios'; // new

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            inputCreateTodoValue: '',
            inputUpdateTodoValue: '', // only needed for debugging API interop
        };
        this.API_URL = 'http://localhost:8000/api/v1/todos/';
        this.SLASH = '/';
    }
 
    componentDidMount() {
        this.readTodos();
    }

    createTodo() {
        if (this.state.inputCreateTodoValue.length > 0) {
            const params = new URLSearchParams();
            params.append('title', this.state.inputCreateTodoValue);
            params.append('completed', 'false'); // should be default value.. comment this?
            axios
            .post(this.API_URL, params) // Create remote data point
            .then(res => { // Update the local data point inside the state
                if (res.status === 201){
                    const todo = res.data;
                    const todos = this.state.todos;
                    todos[todo.id] = { // prefer indexed data structure (dictionary) over response's data structure (array)
                        'title': todo.title,
                        'completed': todo.completed
                    };
                    this.setState({ todos: todos });
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    readTodos() {
        axios
            .get(this.API_URL)
            .then(res => {
                const arr = res.data;
                let result = {};
                for (let i=0; i<arr.length; i++) {
                    result[arr[i].id] = {
                        'title': arr[i].title,
                        'completed': arr[i].completed
                    };
                }
                this.setState( { todos: result })
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateTodo(itemId) {
        const params = new URLSearchParams();
        params.append('title', this.state.inputUpdateTodoValue);
        axios
        .put(this.API_URL + itemId.toString() + this.SLASH, params)
        .then(res => {
            if (res.status === 200) {
                const todos = this.state.todos;
                todos[itemId].title = this.state.inputUpdateTodoValue;
                this.setState({ todos: todos });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteTodo(itemId) {
        axios
        .delete(this.API_URL + itemId.toString() + this.SLASH)
        .then(res => {
            if (res.status === 204) {
                const todos = this.state.todos;
                delete todos[itemId];
                this.setState({ todos: todos });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    updateInputCreateTodoValue(evt) {
        this.setState({ inputCreateTodoValue: evt.target.value });
    }

    updateInputUpdateTodoValue(evt) {
        this.setState({ inputUpdateTodoValue: evt.target.value });
    }

    render() {
      return (
          <div>
            <button onClick={this.createTodo.bind(this)}>{'+'}</button>
            <input
                value={this.state.inputCreateTodoValue}
                onChange={evt => this.updateInputCreateTodoValue(evt)}
                type='text'
                placeholder='Enter your task here...'>
            </input>
            <input
                value={this.state.inputUpdateTodoValue}
                onChange={evt => this.updateInputUpdateTodoValue(evt)}
                type='text'
                placeholder='Edited value for todo'>
            </input>
            <div> {
                Object.keys(this.state.todos).map( todoId => (
                    <div key={ todoId }>
                        <span>{this.state.todos[todoId].completed.toString()+' '}</span>
                        <label>{this.state.todos[todoId].title+' '}</label>
                        <button onClick={this.updateTodo.bind(this, todoId)}>{'Update'}</button>
                        <button onClick={this.deleteTodo.bind(this, todoId)}>{'X'}</button>
                    </div>
                ))
            }
            </div>
        </div>
      );
    }
}

export default App;