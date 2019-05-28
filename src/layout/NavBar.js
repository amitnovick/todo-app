import React from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import cloudLogo from '../assets/cloud.png';

const BrandMenuItem = () => (
  <Menu.Item as={Link} to={'/'} active={false}>
    <img src={cloudLogo} alt="cloud_logo" />
  </Menu.Item>
);

const NavigationMenuItems = ({ items, activeItem }) =>
  items.map(({ path, menuTitle }) => (
    <Menu.Item as={Link} to={path} key={path} active={activeItem === path}>
      {menuTitle}
    </Menu.Item>
  ));

const BiggerScreens = ({ items, activeItem }) => (
  <Grid.Row columns={1} only="tablet computer">
    <Grid.Column>
      <Menu color="teal" inverted size="huge">
        <BrandMenuItem />
        <Menu.Menu position="right">
          <NavigationMenuItems items={items} activeItem={activeItem} />
        </Menu.Menu>
      </Menu>
    </Grid.Column>
  </Grid.Row>
);

const SmallerScreens = ({ items, activeItem, isCollapsed, setIsCollapsed }) => (
  <React.Fragment>
    <Grid.Row columns={1} only="mobile" style={{ paddingBottom: 0 }}>
      <Grid.Column>
        <Menu color="teal" inverted size="huge">
          <BrandMenuItem />
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
            <NavigationMenuItems items={items} activeItem={activeItem} />
          </Menu>
        )}
      </Grid.Column>
    </Grid.Row>
  </React.Fragment>
);

const NavBar = ({ items, location }) => {
  const activeItem = location.pathname;
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <Grid style={{ marginBottom: 10 }}>
      <BiggerScreens items={items} activeItem={activeItem} />
      <SmallerScreens
        items={items}
        activeItem={activeItem}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Grid>
  );
};

export default withRouter(NavBar);
