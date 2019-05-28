import React from 'react';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../firebase/auth';
import sharedRoutes from '../../routes/sharedRoutes';
import AccountScreen from './Presntational';

const handleLogout = async (send, history) => {
  try {
    await signOut();
    history.push(
      sharedRoutes.HOME
    ); /* Race condition with `send`, must be fired first */
    send(
      'UNAUTHENTICATED_SUCCESSFULLY_FROM_ACCOUNT_SCREEN'
    ); /* Race condition with `history.push`, must be fired second */
  } catch (error) {}
};

const AccountScreenContainer = ({ userOAuth, send, history }) => {
  const { email } = userOAuth;
  return (
    <AccountScreen
      email={email}
      handleLogout={() => handleLogout(send, history)}
    />
  );
};

export default withRouter(AccountScreenContainer);
