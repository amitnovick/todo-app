import React from "react";

const AccountSettings = ({
  // grandparent state
  isAuthenticated,
  // container methods
  doEffect
}) =>
  isAuthenticated ? (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => doEffect()}>Logout</button>
    </div>
  ) : (
    <h1>Access Denied</h1>
  );

export default AccountSettings;
