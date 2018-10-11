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
                    const todoObj = res.data; // { 'id':..., 'title':..., 'completed':... }
                    const todos = this.state.todos;
                    const updatedTodos = this.insertTodoObj(todoObj, todos);
                    this.setState({ todos: updatedTodos });
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
                const arrTodos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
                let objTodos = {}; // { <id_x>: {'title':..., 'completed':...}, <id_y>:{...}, ... }
                for (let i=0; i<arrTodos.length; i++) {
                    const todoObj = arrTodos[i];  // { 'id':..., 'title':..., 'completed':... }
                    objTodos = this.insertTodoObj(todoObj, objTodos);
                }
                const updatedObjTodos = objTodos;
                this.setState( { todos: updatedObjTodos })
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
                const updatedTodos = todos;
                this.setState({ todos: updatedTodos });
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
                const updatedTodos = todos;
                this.setState({ todos: updatedTodos });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    /* Helper method which enables code reuse and separation of concerns */
    insertTodoObj(todoObj, todos) {
        todos[todoObj.id] = {
            'title': todoObj.title,
            'completed': todoObj.completed
        };
        return todos;
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