import React from 'react';
import PropTypes from 'prop-types';

import {
  liStyle,
  buttonStyle,
  input1Style,
  input2Style,
  ulStyle,
  divStyle,
  labelStyle
} from './style';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const Li = ({ ...props }) => <li {...props} className={liStyle} />;

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInEditMode: false,
      todoBeingEdited: null,
      editTitle: ''
    };

    this.inputRef = React.createRef();
  }

  replaceTitle = todo => {
    const { editTitle } = this.state;
    const editTitleValue = editTitle.trim();
    if (editTitleValue.length === 0) {
      this.props.onDelete({ todo });
    } else if (editTitleValue !== todo.title) {
      this.props.onEdit({ todo: todo, newTitle: editTitleValue });
      this.deactivateTitleEditMode();
      this.setState({ editTitle: '' });
    } else {
      this.deactivateTitleEditMode();
    }
  };

  activateTitleEditMode = todo => {
    this.setState({
      isInEditMode: true,
      todoBeingEdited: todo
    });
  };

  deactivateTitleEditMode = () => {
    this.setState({
      isInEditMode: false,
      todoBeingEdited: null
    });
  };

  isTodoBeingEdited = todo => {
    const { isInEditMode, todoBeingEdited } = this.state;
    return isInEditMode && todo.id === todoBeingEdited.id;
  };

  /* TodoListItem */
  handleTitleClick = todo => {
    const { isInEditMode } = this.state;
    if (!isInEditMode) {
      this.activateTitleEditMode(todo);
      this.setState({ editTitle: todo.title });
    }
  };

  handleEditTitleTextChange = event => {
    this.setState({ editTitle: event.target.value });
  };

  handleEditTitleKeyDown = event => {
    const { onHitEnterKey, onBlur } = this.props;
    if (event.which === ESCAPE_KEY) {
      onBlur();
    } else if (event.which === ENTER_KEY) {
      onHitEnterKey();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !(prevState.todoBeingEdited && prevState.todoBeingEdited.id) &&
      (this.state.todoBeingEdited && this.state.todoBeingEdited.id)
    ) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const {
      onToggle,
      onDelete,
      onBlur,
      onClickTitle,
      todos,
      editedTodo,
      editedTodoValue,
      isBeingEdited,
      onChangeEditedTodoValue
    } = this.props;
    return (
      <div className={divStyle}>
        <ul className={ulStyle}>
          {todos.map(todo => {
            const isThisTodoBeingEdited = isBeingEdited && todo === editedTodo;
            if (isThisTodoBeingEdited) {
              return (
                <Li key={todo.id}>
                  <div key={todo.id}>
                    <input
                      className={input2Style}
                      ref={this.inputRef}
                      value={editedTodoValue}
                      onChange={({ target }) =>
                        onChangeEditedTodoValue({ title: target.value })
                      }
                      onKeyDown={event => this.handleEditTitleKeyDown(event)}
                      onBlur={onBlur}
                      autoFocus={true} // Crucial here!
                      type="text"
                    />
                  </div>
                </Li>
              );
            } else {
              return (
                <Li key={todo.id}>
                  <div>
                    <input
                      className={input1Style}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggle({ todo })}
                    />
                    <label
                      className={labelStyle}
                      style={
                        todo.completed
                          ? {
                              color: '#d9d9d9',
                              textDecoration: 'line-through',
                              backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')`
                            }
                          : {}
                      }
                      onClick={() => onClickTitle({ todo })}
                    >
                      {todo.title + ' '}
                    </label>
                    <button
                      className={buttonStyle}
                      onClick={() => onDelete({ todo })}
                    />
                  </div>
                </Li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  editedTodo: PropTypes.object.isRequired,
  editedTodoValue: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  onChangeEditedTodoValue: PropTypes.func.isRequired,
  onHitEnterKey: PropTypes.func.isRequired
};

export default TodoList;
