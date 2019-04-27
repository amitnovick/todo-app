import React from 'react';

import styles from './style.module.css';

import {
  StyledInputEdit,
  StyledInputCheckbox,
  StyledLabelTitle,
  StyledUnorderedList,
  StyledDiv,
} from './style.js';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTodo: null,
      editTitle: '',
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
      editingTodo: todo,
    });
  };

  deactivateTitleEditMode = () => {
    this.setState({
      editingTodo: null,
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
    console.log('styles?', styles);
    return (
      <StyledDiv>
        <StyledUnorderedList>
          {todos.map(todo => {
            const isBeingEdited = this.isTodoBeingEdited(todo);
            let content;
            if (isBeingEdited) {
              content = (
                <div key={todo.id}>
                  <StyledInputEdit
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
                  <StyledInputCheckbox
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                  />
                  <StyledLabelTitle
                    isCompleted={todo.completed}
                    onDoubleClick={() => this.handleTitleClick(todo)}
                  >
                    {todo.title + ' '}
                  </StyledLabelTitle>
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
        </StyledUnorderedList>
      </StyledDiv>
    );
  }
}

export default TodoList;
