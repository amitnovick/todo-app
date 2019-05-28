import React from 'react';
import NavBar from '../layout/NavBar';
import unauthenticatedRoutes from '../routes/unauthenticatedRoutes';
import sharedRoutes from '../routes/sharedRoutes';

const unauthenticatedMenuTitleByPath = path => {
  switch (path) {
    case sharedRoutes.APP:
      return 'App';
    case sharedRoutes.FEATURES:
      return 'Features';
    case unauthenticatedRoutes.SIGNIN:
      return 'SignIn';
    default:
      return 'Unknown';
  }
};

const unauthenticatedMenuItems = [
  {
    path: sharedRoutes.APP,
    menuTitle: unauthenticatedMenuTitleByPath(sharedRoutes.APP)
  },
  {
    path: sharedRoutes.FEATURES,
    menuTitle: unauthenticatedMenuTitleByPath(sharedRoutes.FEATURES)
  },
  {
    path: unauthenticatedRoutes.SIGNIN,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.SIGNIN)
  }
];

const UnauthenticatedNavBar = () => <NavBar items={unauthenticatedMenuItems} />;

export default UnauthenticatedNavBar;
