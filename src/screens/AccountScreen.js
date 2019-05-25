import React from 'react';
import { signOut } from '../firebase/auth.js';

const AccountScreen = ({ email, handleLogout }) => {
  return (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => handleLogout()}>Logout</button>
      <p>Email: {email}</p>
    </div>
  );
};

const handleLogout = async send => {
  try {
    await signOut();
    send('UNAUTHENTICATED_SUCCESSFULLY');
  } catch (error) {
    console.log(error);
  }
};

const AccountScreenContainer = ({ userOAuth, send }) => {
  const { email } = userOAuth;
  return (
    <AccountScreen email={email} handleLogout={() => handleLogout(send)} />
  );
};

export default AccountScreenContainer;
