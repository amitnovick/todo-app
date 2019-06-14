import React from 'react';
import { logoutButtonStyle } from './style';

const AccountScreen = ({ email, handleLogout }) => {
  return (
    <div>
      <h1>Account Settings</h1>
      <button className={logoutButtonStyle} onClick={() => handleLogout()}>
        Logout
      </button>
      <p style={{ fontSize: 26 }}>Email: {email}</p>
    </div>
  );
};

export default AccountScreen;
