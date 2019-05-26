/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import colors from '../colors';

const listStyle = {
  listStyle: 'none',
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

const anchorOpenLinkInNewTab = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

const AboutScreen = () => {
  return (
    <div>
      <h2> Hi there! </h2>
      <p style={{ fontSize: 24 }}>
        {`This is a notes app that allows users to write notes describing tasks. `}
        <span role="img" aria-label="flex-biceps">
          💪
        </span>
      </p>
      <p style={{ fontSize: 24 }}>
        You're welcome to use the Demo version of the app, wherein your changes
        are saved locally.
      </p>
      <p style={{ fontSize: 24 }}>
        {`Logging-in will enable you to use the Cloud version, with the benefit of
        having all your notes backed up and synchronized automatically for you
        across devices. `}
        <span role="img" aria-label="flex-biceps">
          🔄
        </span>
      </p>
      <p style={{ fontSize: 24 }}>
        The Cloud version lets you use multiple devices simultaneously (e.g.
        phone and laptop), with changes arriving at real-time as soon as they
        are performed.
      </p>
      <p style={{ fontSize: 24 }}>
        Both versions work fully offline! the Cloud version will also
        synchronize with other devices as soon as you reconnect to the network.
      </p>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
          <a
            css={anchorStyle}
            {...anchorOpenLinkInNewTab}
            href="https://github.com/amitnovick/todo-app"
          >
            Source code available on GitHub
          </a>
        </li>
        <li style={listItemStyle}>
          <FontAwesomeIcon icon={faTwitter} style={{ marginRight: 4 }} />
          <a
            css={anchorStyle}
            {...anchorOpenLinkInNewTab}
            href="https://twitter.com/amitnovick"
          >
            Come and say hi on Twitter @amitnovick
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutScreen;
