import React, { Component } from 'react';
import axios from 'axios';

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
            params.append('completed', 'false');
            axios
            .post(this.API_URL, params)
            .then(res => {
                if (res.status === 201){
                    const todo = res.data; // { 'id':..., 'title':..., 'completed':... }
                    const todos = this.state.todos;
                    const newTodos = todos.concat([todo]);
                    this.setState({ todos: newTodos });
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
                const todos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
                this.setState( { todos: todos });
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
                const newTodos = todos.map(todo => {
                    if (todo.id === itemId) {
                        return {
                            'id':todo.id,
                            'title': this.state.inputUpdateTodoValue,
                            'completed': todo.completed
                        };
                    }
                    return todo;
                });
                this.setState({ todos: newTodos });
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
                const newTodos = todos.filter(todo => todo.id !== itemId);
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
        return (
            <div>
                <button onClick={this.createTodo.bind(this)}>{'+'}</button>
                <input
                    value={this.state.inputCreateTodoValue}
                    onChange={event => this.updateInputCreateTodoValue(event)}
                    type='text'
                    placeholder='Enter your task here...'>
                </input>
                <input
                    value={this.state.inputUpdateTodoValue}
                    onChange={event => this.updateInputUpdateTodoValue(event)}
                    type='text'
                    placeholder='Edited value for todo'>
                </input>
                <div> { // Todo Items
                    this.state.todos.map( todo => (
                        <div key={ todo.id }>
                            <span>{todo.completed.toString()+' '}</span>
                            <label>{todo.title+' '}</label>
                            <button
                                onClick={this.updateTodo.bind(this, todo.id)}>
                                {'Update'}
                            </button>
                            <button
                                onClick={this.deleteTodo.bind(this, todo.id)}>
                                {'X'}
                            </button>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default App;