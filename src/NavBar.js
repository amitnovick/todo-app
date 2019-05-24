/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { darken } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import currentPathAtom from './state/currentPathAtom';

const changePath = newPath => {
  swap(currentPathAtom, _ => newPath);
  window.history.pushState(null, null, newPath);
};

const anchorStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'inline',
  margin: 2,
  padding: 0
};

const navItemStyle = {
  textDdecoration: 'none',
  color: 'white'
};

const MEDIA_QUERY_VIEWPORT_768 = '@media screen and (min-width: 768px)';

const isCollapsibleOpenStateAtom = Atom.of(false);

const NavBar = ({ menuItems }) => {
  const isCollapsibleOpen = useAtom(isCollapsibleOpenStateAtom);

  return (
    <nav
      css={{
        fontSize: 18,
        backgroundColor: darken(0.15, 'cyan'),
        border: '1px solid rgba(0, 0, 0, 0.2)',
        paddingBottom: 10,
        [MEDIA_QUERY_VIEWPORT_768]: {
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '0',
          height: '70px',
          alignItems: 'center'
        }
      }}
    >
      <span
        css={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          cursor: 'pointer',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '24px',
          [MEDIA_QUERY_VIEWPORT_768]: {
            display: 'none'
          }
        }}
        onClick={() => swap(isCollapsibleOpenStateAtom, state => !state)}
      >
        <FontAwesomeIcon icon={faBars} />
      </span>
      <button
        onClick={() => changePath('/')}
        css={{
          ...navItemStyle,
          ...anchorStyle,
          display: 'inline-block',
          fontSize: 22,
          fontWeight: 500,
          marginTop: 10,
          marginLeft: 20,
          [MEDIA_QUERY_VIEWPORT_768]: {
            marginTop: '0'
          },
          ':hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Notes
      </button>
      <ul
        css={{
          listStyleType: 'none',
          display: isCollapsibleOpen === false ? 'none' : 'block',
          [MEDIA_QUERY_VIEWPORT_768]: {
            display: 'flex',
            marginRight: '30px',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }
        }}
      >
        {menuItems.map(({ path, menuTitle }) => (
          <li
            key={path}
            css={{
              textAlign: 'center',
              margin: '15px auto',
              [MEDIA_QUERY_VIEWPORT_768]: {
                margin: '0'
              }
            }}
          >
            <button
              onClick={() => changePath(path)}
              css={{
                ...anchorStyle,
                ...navItemStyle,
                [MEDIA_QUERY_VIEWPORT_768]: {
                  marginLeft: '40px'
                },
                ':hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {menuTitle}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
