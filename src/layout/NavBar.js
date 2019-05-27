import React from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import cloudLogo from '../assets/cloud.png';

const MenuExampleStackable = ({ items }) => {
  const [activeItem, setActiveItem] = React.useState(null);
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Grid style={{ marginBottom: 10 }}>
      <Grid.Row columns={1} only="tablet computer">
        <Grid.Column>
          <Menu color="teal" inverted size="huge">
            <Menu.Item
              as={Link}
              to={'/'}
              active={false}
              name="Home"
              onClick={handleItemClick}
            >
              <img src={cloudLogo} alt="cloud_logo" />
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} only="mobile" style={{ paddingBottom: 0 }}>
        <Grid.Column>
          <Menu color="teal" inverted size="huge">
            <Menu.Item
              as={Link}
              to={'/'}
              active={false}
              name="Home"
              onClick={handleItemClick}
            >
              <img src={cloudLogo} alt="cloud_logo" />
            </Menu.Item>
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
            </Menu>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default MenuExampleStackable;
