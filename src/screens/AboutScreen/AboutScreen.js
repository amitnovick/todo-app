import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import { StyledUl, StyledLi, StyledAnchor, StyledP } from './style';

const anchorOpenLinkInNewTab = {
  target: '_blank',
  rel: 'noopener noreferrer'
};

const AboutScreen = () => {
  return (
    <div>
      <h2> Hi there! </h2>
      <StyledP>
        {`This is an app that that lets you write notes describing your tasks. `}
        <span role="img" aria-label="flex-biceps">
          💪
        </span>
      </StyledP>
      <StyledP>
        The Demo version will let you get a quick feel of the note taking
        experience without having to register.
      </StyledP>
      <StyledP>
        {`However, logging-in is recommended in order to have acecss to the Cloud version, with the benefit of
        having all your notes backed up remotely, and synchronized automatically for you
        across devices. `}
        <span role="img" aria-label="flex-biceps">
          🔄
        </span>
      </StyledP>
      <StyledP>
        The Cloud version lets you use multiple devices simultaneously (e.g.
        phone and laptop), with changes arriving at real-time as soon as they
        are performed.
      </StyledP>
      <StyledP>
        Both versions work fully offline! the Cloud version will also
        synchronize with other devices as soon as you reconnect to the network.
      </StyledP>
      <StyledUl>
        <StyledLi>
          <FontAwesomeIcon icon={faGithub} style={{ marginRight: 4 }} />
          <StyledAnchor
            {...anchorOpenLinkInNewTab}
            href="https://github.com/amitnovick/todo-app"
          >
            Source code available on GitHub
          </StyledAnchor>
        </StyledLi>
        <StyledLi>
          <FontAwesomeIcon icon={faTwitter} style={{ marginRight: 4 }} />
          <StyledAnchor
            {...anchorOpenLinkInNewTab}
            href="https://twitter.com/amitnovick"
          >
            Come and say hi on Twitter @amitnovick
          </StyledAnchor>
        </StyledLi>
      </StyledUl>
    </div>
  );
};

export default AboutScreen;
