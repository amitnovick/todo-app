import React from 'react';
import PropTypes from 'prop-types';

import { inputStyleBeingEdited, inputStyleIdle } from './style';

const ENTER_KEY = 13;

class CreateTodoTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: ''
    };

    this.inputRef = React.createRef();
  }

  handleNewTitleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleKeyDown = event => {
    const { newTitle } = this.state;
    const { onHitEnterKey } = this.props;
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (pressedEnter) {
      onHitEnterKey({ title: newTitle });
      this.setState({ newTitle: '' });
    }
  };

  render() {
    const { newTitle } = this.state;
    const { isBeingEdited, onClick, onBlur } = this.props;
    return (
      <input
        className={isBeingEdited ? inputStyleBeingEdited : inputStyleIdle}
        value={newTitle}
        onChange={event => this.handleNewTitleChange(event)}
        type="text"
        placeholder="Enter your task here..."
        onKeyDown={event => this.handleKeyDown(event)}
        autoFocus={isBeingEdited}
        onClick={() => onClick({ title: newTitle })}
        onBlur={onBlur}
      />
    );
  }
}

CreateTodoTextbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  onHitEnterKey: PropTypes.func.isRequired
};

export default CreateTodoTextbox;
