/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import colors from '../colors';

const listStyle = {
  padding: 0
};

const listItemStyle = {
  margin: 4,
  fontSize: 24
};

const anchorStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'inline',
  margin: 2,
  padding: 0,
  textDecoration: 'none',
  color: colors.CYAN,
  ':hover': {
    textDecoration: 'underline'
  }
};

const AboutScreen = () => {
  return (
    <div>
      <h2> Features:</h2>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          Try out the Demo app to see if you like it, no login required!
        </li>
        <li style={listItemStyle}>
          Logging-in will enable your data to be automatically saved for you.
        </li>
        <li style={listItemStyle}>
          Can be used in two or more devices simultaneously, using real-time
          synchronization! Try opening it in a new tab or on your phone and see
          updates arriving as soon as they are sent.
        </li>
        <li style={listItemStyle}>
          This app can be used while offline! your changes will be saved as
          usual, and synchronized back once you reconnect to the network.
        </li>
        <li style={listItemStyle}>
          <a css={anchorStyle} href="https://github.com/amitnovick/todo-app">
            Source code available on GitHub
          </a>
        </li>
        <li style={listItemStyle}>
          <a css={anchorStyle} href="https://twitter.com/amitnovick">
            Chat me up on Twitter
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutScreen;
