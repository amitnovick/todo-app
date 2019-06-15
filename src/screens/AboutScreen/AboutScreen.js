import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { ulStyle, liStyle, aStyle, pStyle } from './style';

const P = ({ children, ...props }) => (
  <p {...props} className={pStyle}>
    {children}
  </p>
);

const anchorOpenLinkInNewTabProps = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

const A = ({ children, ...props }) => (
  <a {...props} {...anchorOpenLinkInNewTabProps} className={aStyle}>
    {children}
  </a>
);

const AboutScreen = () => {
  return (
    <div>
      <h2> Hi there! </h2>
      <P>
        {`This is an app that that lets you write notes describing your tasks. `}
        <span role="img" aria-label="flex-biceps">
          💪
        </span>
      </P>
      <P>
        The Demo version will let you get a quick feel of the note taking
        experience without having to register.
      </P>
      <P>
        {`However, logging-in is recommended in order to have acecss to the Cloud version, with the benefit of
        having all your notes backed up remotely, and synchronized automatically for you
        across devices. `}
        <span role="img" aria-label="flex-biceps">
          🔄
        </span>
      </P>
      <P>
        The Cloud version lets you use multiple devices simultaneously (e.g.
        phone and laptop), with changes arriving at real-time as soon as they
        are performed.
      </P>
      <P>
        Both versions work fully offline! the Cloud version will also
        synchronize with other devices as soon as you reconnect to the network.
      </P>
      <ul className={ulStyle}>
        <li className={liStyle}>
          <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
          <A href="https://github.com/amitnovick/todo-app">
            Source code available on GitHub
          </A>
        </li>
        <li className={liStyle}>
          <FontAwesomeIcon icon={faTwitter} style={{ marginRight: 4 }} />
          <A href="https://twitter.com/amitnovick">
            Come and say hi on Twitter @amitnovick
          </A>
        </li>
      </ul>
    </div>
  );
};

export default AboutScreen;
