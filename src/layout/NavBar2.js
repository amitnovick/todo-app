import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import cloudLogo from '../assets/cloud.png';

const MenuExampleStackable = ({ items }) => {
  const [activeItem, setActiveItem] = React.useState(null);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu color="teal" inverted size="huge">
      <Menu.Item
        as={Link}
        to={'/'}
        active={false}
        name="Home"
        onClick={handleItemClick}
      >
        <img
          src={cloudLogo}
          alt="cloud_logo"
          // width="48"
          // height="48"
        />
      </Menu.Item>
      <Menu.Menu position="right">
        {items.map(({ path, menuTitle }) => (
          <Menu.Item
            as={Link}
            to={path}
            key={path}
            active={activeItem === path}
            name={path}
            onClick={handleItemClick}
          >
            {menuTitle}
          </Menu.Item>
        ))}
      </Menu.Menu>
    </Menu>
  );
};

export default MenuExampleStackable;
