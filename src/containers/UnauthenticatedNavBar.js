import React from 'react';
import NavBar from '../layout/NavBar';
import unauthenticatedRoutes from '../routes/unauthenticatedRoutes';

const unauthenticatedMenuTitleByPath = path => {
  switch (path) {
    case unauthenticatedRoutes.DEMO:
      return 'Demo';
    case unauthenticatedRoutes.FEATURES:
      return 'Features';
    case unauthenticatedRoutes.SIGNIN:
      return 'SignIn';
    default:
      return 'Unknown';
  }
};

const unauthenticatedMenuItems = [
  {
    path: unauthenticatedRoutes.DEMO,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.DEMO)
  },
  {
    path: unauthenticatedRoutes.FEATURES,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.FEATURES)
  },
  {
    path: unauthenticatedRoutes.SIGNIN,
    menuTitle: unauthenticatedMenuTitleByPath(unauthenticatedRoutes.SIGNIN)
  }
];

const UnauthenticatedNavBar = () => <NavBar items={unauthenticatedMenuItems} />;

export default UnauthenticatedNavBar;
