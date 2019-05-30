/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

const inputStyle = {
  position: 'relative',
  margin: '0',
  width: '100%',
  fontSize: '24px',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  lineHeight: '1.4em',
  color: 'inherit',
  boxSizing: 'border-box',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  padding: '16px 16px 16px 60px',
  border: 'none',
  background: 'rgba(0, 0, 0, 0.003)',
  boxShadow: 'inset 0 -2px 1px rgba(0, 0, 0, 0.03)',
  '::placeholder': { fontStyle: 'italic', fontWeight: '300', color: '#e6e6e6' }
};

const ENTER_KEY = 13;

class CreateTodoTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: ''
    };
  }

  handleNewTitleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleNewTitleKeyDown = event => {
    const pressedEnter = event.keyCode === ENTER_KEY;
    if (!pressedEnter) return;

    const newTitleValue = this.state.newTitle.trim();

    const shouldCreateNewTodo = newTitleValue.length > 0;
    if (!shouldCreateNewTodo) return;
    else {
      this.props.createTodo(newTitleValue);
      this.setState({ newTitle: '' });
    }
  };

  render() {
    const { newTitle } = this.state;
    return (
      <input
        css={inputStyle}
        value={newTitle}
        onChange={event => this.handleNewTitleChange(event)}
        type="text"
        placeholder="Enter your task here..."
        onKeyDown={event => this.handleNewTitleKeyDown(event)}
        autoFocus={true}
      />
    );
  }
}

export default CreateTodoTextbox;
