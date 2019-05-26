import React from 'react';

const logoutButtonStyle = {
  backgroundColor: '#dd4b39',
  color: 'white',
  fontSize: 26,
  borderRadius: 6,
  border: '1px solid',
  padding: 12
};

const AccountScreen = ({ email, handleLogout }) => {
  return (
    <div>
      <h1>Account Settings</h1>
      <button style={logoutButtonStyle} onClick={() => handleLogout()}>
        Logout
      </button>
      <p style={{ fontSize: 26 }}>Email: {email}</p>
    </div>
  );
};

export default AccountScreen;
