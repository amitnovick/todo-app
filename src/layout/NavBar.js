/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Atom, useAtom, swap } from '@dbeining/react-atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import colors from '../colors';
import cloudLogo from '../assets/cloud.png';

const anchorStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'inline',
  margin: 2,
  padding: 0,
  textDecoration: 'none'
};

const navItemStyle = {
  color: 'white',
  ':hover': {
    textDecoration: 'underline'
  }
};

const MEDIA_QUERY_VIEWPORT_768 = '@media screen and (min-width: 768px)';

const isCollapsibleOpenStateAtom = Atom.of(false);

const MenuItems = ({ items }) => {
  const isCollapsibleOpen = useAtom(isCollapsibleOpenStateAtom);
  return (
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
      {items.map(({ path, menuTitle }) => (
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
          <Link
            to={path}
            css={{
              ...anchorStyle,
              ...navItemStyle,
              [MEDIA_QUERY_VIEWPORT_768]: {
                marginLeft: '40px'
              }
            }}
          >
            {menuTitle}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const BrandMenuItems = () => {
  return (
    <ul
      css={{
        listStyleType: 'none',
        marginLeft: 20,
        display: 'flex',
        marginRight: '30px',
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
    >
      <li
        css={{
          textAlign: 'center',
          margin: 'auto 0px'
        }}
      >
        <Link
          to={'/'}
          css={{
            ...anchorStyle,
            ...navItemStyle,
            marginLeft: '10px'
          }}
        >
          <img
            src={cloudLogo}
            alt="cloud_logo"
            width="48"
            height="48"
            style={{ margin: '2px', padding: '0px' }}
          />
        </Link>
      </li>
      <li
        css={{
          textAlign: 'center',
          margin: 'auto 0px'
        }}
      >
        <Link
          to={'/'}
          css={{
            textDecoration: 'none',
            color: 'white',
            fontSize: 24,
            fontWeight: 900,
            marginLeft: '10px'
          }}
        >
          {'CloudNotes'}
        </Link>
      </li>
    </ul>
  );
};

const NavBar = ({ items }) => (
  <nav
    css={{
      backgroundColor: colors.CYAN,
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 10,
      height: '70px',
      alignItems: 'center',
      border: '1px solid rgba(0, 0, 0, 0.2)'
    }}
  >
    <BrandMenuItems />
    <nav
      css={{
        fontSize: 18,
        backgroundColor: colors.CYAN,
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
      <MenuItems items={items} />
    </nav>
  </nav>
);

export default NavBar;
