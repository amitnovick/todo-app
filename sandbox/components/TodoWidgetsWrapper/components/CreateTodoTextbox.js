import React from 'react';
import PropTypes from 'prop-types';

import { inputStyleBeingEdited, inputStyleIdle } from './style';

const ENTER_KEY = 13;

const CreateTodoTextbox = ({
  inputValue,
  isBeingEdited,
  onClick,
  onBlur,
  onInputChange,
  onHitEnterKey
}) => {
  const handleKeyDown = keyCode => {
    const didHitEnterKey = keyCode === ENTER_KEY;
    if (didHitEnterKey) {
      onHitEnterKey();
    }
  };

  return (
    <input
      className={isBeingEdited ? inputStyleBeingEdited : inputStyleIdle}
      value={inputValue}
      onChange={({ target }) => onInputChange({ title: target.value })}
      type="text"
      placeholder="Enter your task here..."
      onKeyDown={({ keyCode }) => handleKeyDown(keyCode)}
      autoFocus={isBeingEdited}
      onClick={onClick}
      onBlur={() => onBlur()}
    />
  );
};

CreateTodoTextbox.propTypes = {
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  onHitEnterKey: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired
};

export default CreateTodoTextbox;
