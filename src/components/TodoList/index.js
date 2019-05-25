import React from 'react';

import styles from './style.module.css';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTodo: null,
      editTitle: ''
    };

    this.inputRef = React.createRef();
  }

  replaceTitle = todo => {
    const editTitleValue = this.state.editTitle.trim();
    if (editTitleValue.length === 0) this.props.onDelete(todo);
    else if (editTitleValue !== todo.title) {
      this.props.onEdit(todo, editTitleValue);
      this.deactivateTitleEditMode();
      this.setState({ editTitle: '' });
    } else this.deactivateTitleEditMode();
  };

  activateTitleEditMode = todo => {
    this.setState({
      editingTodo: todo
    });
  };

  deactivateTitleEditMode = () => {
    this.setState({
      editingTodo: null
    });
  };

  isTodoBeingEdited = todo => {
    return this.state.editingTodo && todo.id === this.state.editingTodo.id;
  };

  /* TodoListItem */
  handleTitleClick = todo => {
    this.activateTitleEditMode(todo);
    this.setState({ editTitle: todo.title });
  };

  handleEditTitleTextChange = event => {
    this.setState({ editTitle: event.target.value });
  };

  handleEditTitleKeyDown = (event, todo) => {
    if (event.which === ESCAPE_KEY) {
      this.deactivateTitleEditMode();
    } else if (event.which === ENTER_KEY) {
      this.replaceTitle(todo);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !(prevState.editingTodo && prevState.editingTodo.id) &&
      (this.state.editingTodo && this.state.editingTodo.id)
    ) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const { onToggle, onDelete, todos } = this.props;
    const { editTitle } = this.state;
    return (
      <div className={styles['div-1']}>
        <ul className={styles['ul-1']}>
          {todos.map(todo => {
            const isBeingEdited = this.isTodoBeingEdited(todo);
            let content;
            if (isBeingEdited) {
              content = (
                <div key={todo.id}>
                  <input
                    className={styles['input-2']}
                    ref={this.inputRef}
                    value={editTitle}
                    onChange={event => this.handleEditTitleTextChange(event)}
                    onKeyDown={event =>
                      this.handleEditTitleKeyDown(event, todo)
                    }
                    onBlur={() => this.replaceTitle(todo)}
                    type="text"
                  />
                </div>
              );
            } else {
              content = (
                <div>
                  <input
                    className={styles['input-1']}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                  />
                  <label
                    className={styles['label-1']}
                    style={
                      todo.completed
                        ? {
                            color: '#d9d9d9',
                            textDecoration: 'line-through',
                            backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')`
                          }
                        : {}
                    }
                    onDoubleClick={() => this.handleTitleClick(todo)}
                  >
                    {todo.title + ' '}
                  </label>
                  <button
                    className={styles['button-1']}
                    onClick={() => onDelete(todo)}
                  />
                </div>
              );
            }
            return (
              <li key={todo.id} className={styles['li-1']}>
                {content}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
