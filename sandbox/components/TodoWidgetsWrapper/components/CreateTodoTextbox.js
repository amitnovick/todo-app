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

  handleNewTitleChange = newTitle => {
    this.setState({ newTitle });
  };

  handleKeyDown = keyCode => {
    const { newTitle } = this.state;
    const { onHitEnterKey } = this.props;
    const didHitEnterKey = keyCode === ENTER_KEY;
    if (didHitEnterKey) {
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
        onChange={({ target }) => this.handleNewTitleChange(target.value)}
        type="text"
        placeholder="Enter your task here..."
        onKeyDown={({ keyCode }) => this.handleKeyDown(keyCode)}
        autoFocus={isBeingEdited}
        onClick={onClick}
        onBlur={() => {
          console.log('createTextBox onBlur');
          onBlur();
        }}
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
