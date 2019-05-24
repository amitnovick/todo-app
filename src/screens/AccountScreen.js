import React from 'react';
import { useAtom } from '@dbeining/react-atom';

import { signOut } from '../firebase/auth.js';
import userOAuthAtom from '../state/userOAuthAtom';
import authenticationService from '../state/authenticationService';

const handleLogOut = async () => {
  try {
    await signOut();
    authenticationService.send('UNAUTHENTICATED_SUCCESSFULLY');
  } catch (error) {
    console.log(error);
  }
};

const AccountScreen = () => {
  const { email } = useAtom(userOAuthAtom);

  return (
    <div>
      <h1>Account Settings</h1>
      <button onClick={() => handleLogOut()}>Logout</button>
      <p>Email: {email}</p>
    </div>
  );
};

export default AccountScreen;
