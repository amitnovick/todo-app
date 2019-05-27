import React from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import cloudLogo from '../assets/cloud.png';

const BrandMenuItem = ({ handleItemClick }) => (
  <Menu.Item
    as={Link}
    to={'/'}
    active={false}
    name="Home"
    onClick={handleItemClick}
  >
    <img src={cloudLogo} alt="cloud_logo" />
  </Menu.Item>
);

const NavigationMenuItems = ({ items, activeItem, handleItemClick }) =>
  items.map(({ path, menuTitle }) => (
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
  ));

const BiggerScreens = ({ items, activeItem, handleItemClick }) => (
  <Grid.Row columns={1} only="tablet computer">
    <Grid.Column>
      <Menu color="teal" inverted size="huge">
        <BrandMenuItem handleItemClick={handleItemClick} />
        <Menu.Menu position="right">
          <NavigationMenuItems
            items={items}
            activeItem={activeItem}
            handleItemClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </Grid.Column>
  </Grid.Row>
);

const SmallerScreens = ({
  items,
  activeItem,
  handleItemClick,
  isCollapsed,
  setIsCollapsed
}) => (
  <React.Fragment>
    <Grid.Row columns={1} only="mobile" style={{ paddingBottom: 0 }}>
      <Grid.Column>
        <Menu color="teal" inverted size="huge">
          <BrandMenuItem handleItemClick={handleItemClick} />
          <Menu.Menu position="right">
            <Menu.Item>
              <FontAwesomeIcon
                icon={faBars}
                style={{ cursor: 'pointer' }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={1} only="mobile" style={{ paddingTop: 0 }}>
      <Grid.Column>
        {isCollapsed ? null : (
          <Menu color="teal" inverted size="huge" stackable>
            <NavigationMenuItems
              items={items}
              activeItem={activeItem}
              handleItemClick={handleItemClick}
            />
          </Menu>
        )}
      </Grid.Column>
    </Grid.Row>
  </React.Fragment>
);

const MenuExampleStackable = ({ items }) => {
  const [activeItem, setActiveItem] = React.useState(null);
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Grid style={{ marginBottom: 10 }}>
      <BiggerScreens
        items={items}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
      />
      <SmallerScreens
        items={items}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Grid>
  );
};

export default MenuExampleStackable;
