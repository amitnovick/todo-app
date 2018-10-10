import React, { Component } from 'react';
import axios from 'axios'; // new

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
        this.inputCreateTodoValue = '';
        this.inputUpdateTodoValue = '';  // only needed for debugging API interop
    }
 
    componentDidMount() {
        this.readTodos();
    }

    createTodo() {
        if (this.inputCreateTodoValue.length > 0) {
            const params = new URLSearchParams();
            params.append('title', this.inputCreateTodoValue);
            params.append('completed', 'false'); // should be default value.. comment this?
            axios
            .post('http://localhost:8000/api/v1/todos/', params) // Create remote data point
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
            .get('http://localhost:8000/api/v1/todos/')
            .then(res => {
                var arr = res.data;
                var result = {};
                for (var i=0; i<arr.length; i++) {
                    result[arr[i].id] = { 'title': arr[i].title, 'completed': arr[i].completed };
                }
                this.setState( { todos: result })
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateTodo(itemId) {
        const params = new URLSearchParams();
        params.append('title', this.inputUpdateTodoValue);
        axios
        .put('http://localhost:8000/api/v1/todos/' + itemId.toString() + '/', params)
        .then(res => {
            if (res.status === 200) {
                const todos = this.state.todos;
                todos[itemId].title = this.inputUpdateTodoValue;
                this.setState({ todos: todos });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteTodo(itemId) {
        axios
        .delete('http://localhost:8000/api/v1/todos/' + itemId.toString() + '/')
        .then(res => {
            if (res.status === 204) {
                delete this.state.todos[itemId];
                this.setState(this.state);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    updateInputCreateTodoValue(evt) {
        console.log('congrats');
        this.inputCreateTodoValue = evt.target.value;
        // this.setState({ inputCreateTodoValue: evt.target.value });
    }

    updateInputUpdateTodoValue(evt) {
        this.inputUpdateTodoValue = evt.target.value;
        // this.setState({ inputUpdateTodoValue: evt.target.value });
    }

    render() {
      return (
          <div>
            <button onClick={this.createTodo.bind(this)}>{'+'}</button>
            <input value={this.inputCreateTodoValue} onChange={evt => this.updateInputCreateTodoValue.bind(evt)} type='text' placeholder='Enter your task here...'></input>
            <input value={this.inputUpdateTodoValue} onChange={evt => this.updateInputUpdateTodoValue.bind(evt)} type='text' placeholder='Edited value for todo'></input>
            <div>
            {
                Object.keys(this.state.todos).map( (objKey, index) => (
                <div key={objKey}>
                    <span>{this.state.todos[objKey].completed.toString()+' '}</span>
                    <label>{this.state.todos[objKey].title+' '}</label>
                    <button onClick={this.updateTodo.bind(this, objKey)}>{'Update'}</button>
                    <button onClick={this.deleteTodo.bind(this, objKey)}>{'X'}</button>
                </div>
                ))}
            </div>
        </div>
      );
    }
}

export default App;