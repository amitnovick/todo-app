import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { ulStyle, liStyle, aStyle, pStyle } from './style';

const anchorOpenLinkInNewTab = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

const AboutScreen = () => {
  return (
    <div>
      <h2> Hi there! </h2>
      <p className={pStyle}>
        {`This is an app that that lets you write notes describing your tasks. `}
        <span role="img" aria-label="flex-biceps">
          💪
        </span>
      </p>
      <p className={pStyle}>
        The Demo version will let you get a quick feel of the note taking
        experience without having to register.
      </p>
      <p className={pStyle}>
        {`However, logging-in is recommended in order to have acecss to the Cloud version, with the benefit of
        having all your notes backed up remotely, and synchronized automatically for you
        across devices. `}
        <span role="img" aria-label="flex-biceps">
          🔄
        </span>
      </p>
      <p className={pStyle}>
        The Cloud version lets you use multiple devices simultaneously (e.g.
        phone and laptop), with changes arriving at real-time as soon as they
        are performed.
      </p>
      <p className={pStyle}>
        Both versions work fully offline! the Cloud version will also
        synchronize with other devices as soon as you reconnect to the network.
      </p>
      <ul className={ulStyle}>
        <li className={liStyle}>
          <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
          <a
            className={aStyle}
            {...anchorOpenLinkInNewTab}
            href="https://github.com/amitnovick/todo-app"
          >
            Source code available on GitHub
          </a>
        </li>
        <li className={liStyle}>
          <FontAwesomeIcon icon={faTwitter} style={{ marginRight: 4 }} />
          <a
            className={aStyle}
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
