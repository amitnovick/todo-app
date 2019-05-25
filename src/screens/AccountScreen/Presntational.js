import React from 'react';

const AccountScreen = ({ email, handleLogout }) => {
  return (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => handleLogout()}>Logout</button>
      <p>Email: {email}</p>
    </div>
  );
};

export default AccountScreen;
