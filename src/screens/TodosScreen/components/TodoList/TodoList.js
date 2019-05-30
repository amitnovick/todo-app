/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import styles from './style.module.css';

const liStyle = {
  position: 'relative',
  fontSize: '24px',
  borderBottom: '1px solid #ededed'
};

const buttonStyle = {
  padding: '0',
  border: '0',
  background: 'none',
  verticalAlign: 'baseline',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  fontSize: '30px',
  WebkitAppearance: 'none',
  appearance: 'none',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  display: 'none',
  position: 'absolute',
  top: '0',
  right: '10px',
  bottom: '0',
  width: '40px',
  height: '40px',
  margin: 'auto 0',
  color: '#cc9a9a',
  marginBottom: '11px',
  transition: 'color 0.2s ease-out',
  ':hover': { color: '#af5b5e' },
  ':after': { content: "'×'" }
};

const inputStyle1 = {
  textAlign: 'center',
  width: '40px',
  height: 'auto',
  position: 'absolute',
  top: '0',
  bottom: '0',
  margin: 'auto 0',
  border: 'none',
  WebkitAppearance: 'none',
  appearance: 'none',
  opacity: '0'
};

const inputStyle2 = {
  position: 'relative',
  fontSize: '24px',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  lineHeight: '1.4em',
  border: '1px solid #999',
  color: 'inherit',
  padding: '12px 16px',
  boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
  boxSizing: 'border-box',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  display: 'block',
  width: '506px',
  margin: '0 0 0 43px'
};

const ulStyle = { margin: '0', padding: '0', listStyle: 'none' };

const divStyle = {
  position: 'relative',
  zIndex: '2',
  borderTop: '1px solid #e6e6e6'
};

const labelStyle = {
  backgroundImage:
    "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center left',
  wordBreak: 'break-all',
  padding: '15px 15px 15px 60px',
  display: 'block',
  lineHeight: '1.2',
  transition: 'color 0.4s',
  marginBottom: '0'
};

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
      <div css={divStyle}>
        <ul css={ulStyle}>
          {todos.map(todo => {
            const isBeingEdited = this.isTodoBeingEdited(todo);
            let content;
            if (isBeingEdited) {
              content = (
                <div key={todo.id}>
                  <input
                    css={inputStyle2}
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
                    css={inputStyle1}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                  />
                  <label
                    css={labelStyle}
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
                    className={styles['button']}
                    css={buttonStyle}
                    onClick={() => onDelete(todo)}
                  />
                </div>
              );
            }
            return (
              <li key={todo.id} className={styles['list-item']} css={liStyle}>
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
