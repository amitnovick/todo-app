import React from 'react';

import authenticatedRoutes from '../routes/authenticatedRoutes';
import NavBar from '../components/NavBar';

const authenticatedMenuTitleByPath = path => {
  switch (path) {
    case authenticatedRoutes.APP:
      return 'App';
    case authenticatedRoutes.FEATURES:
      return 'Features';
    case authenticatedRoutes.ACCOUNT:
      return 'Account';
    default:
      return 'Unknown';
  }
};

const authenticatedMenuItems = [
  {
    path: authenticatedRoutes.APP,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.APP)
  },
  {
    path: authenticatedRoutes.FEATURES,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.FEATURES)
  },
  {
    path: authenticatedRoutes.ACCOUNT,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.ACCOUNT)
  }
];

const AuthenticatedNavBar = () => <NavBar items={authenticatedMenuItems} />;

export default AuthenticatedNavBar;
