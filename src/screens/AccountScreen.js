import React from 'react';
import { withRouter } from 'react-router-dom';

import { signOut } from '../firebase/auth.js';
import unauthenticatedRoutes from '../routes/unauthenticatedRoutes';

const AccountScreen = ({ email, handleLogout }) => {
  return (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => handleLogout()}>Logout</button>
      <p>Email: {email}</p>
    </div>
  );
};

const handleLogout = async (send, history) => {
  try {
    await signOut();
    send('UNAUTHENTICATED_SUCCESSFULLY');
    history.push(unauthenticatedRoutes.HOME);
  } catch (error) {
    console.log(error);
  }
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
