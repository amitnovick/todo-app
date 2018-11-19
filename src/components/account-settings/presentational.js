import React from "react";

const AccountSettings = ({
  // grandparent state
  isAuthenticated,
  // container methods
  handleLogOut
}) =>
  isAuthenticated ? (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => handleLogOut()}>Logout</button>
    </div>
  ) : (
    <h1>Access Denied</h1>
  );

export default AccountSettings;
