import React from 'react';
import { StyledLogoutButton } from './style';

const AccountScreen = ({ email, handleLogout }) => {
  return (
    <div>
      <h1>Account Settings</h1>
      <StyledLogoutButton onClick={() => handleLogout()}>
        Logout
      </StyledLogoutButton>
      <p style={{ fontSize: 26 }}>Email: {email}</p>
    </div>
  );
};

export default AccountScreen;
