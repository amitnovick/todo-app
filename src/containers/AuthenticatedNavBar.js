import React from 'react';

import authenticatedRoutes from '../routes/authenticatedRoutes';
import sharedRoutes from '../routes/sharedRoutes';
import NavBar from '../layout/NavBar';

const authenticatedMenuTitleByPath = path => {
  switch (path) {
    case sharedRoutes.APP:
      return 'App';
    case sharedRoutes.FEATURES:
      return 'Features';
    case authenticatedRoutes.ACCOUNT:
      return 'Account';
    default:
      return 'Unknown';
  }
};

const authenticatedMenuItems = [
  {
    path: sharedRoutes.APP,
    menuTitle: authenticatedMenuTitleByPath(sharedRoutes.APP)
  },
  {
    path: sharedRoutes.FEATURES,
    menuTitle: authenticatedMenuTitleByPath(sharedRoutes.FEATURES)
  },
  {
    path: authenticatedRoutes.ACCOUNT,
    menuTitle: authenticatedMenuTitleByPath(authenticatedRoutes.ACCOUNT)
  }
];

const AuthenticatedNavBar = () => <NavBar items={authenticatedMenuItems} />;

export default AuthenticatedNavBar;
