import React from 'react';
import { Button } from 'reactstrap';

import { signOut } from '../firebase/auth.js';
import { AuthContext } from '../containers/Auth/AuthContext.js';

class AccountScreen extends React.Component {
  handleLogOut = () => {
    signOut();
  };

  render() {
    return (
      <div>
        <h1>Account Settings</h1>
        <Button onClick={() => this.handleLogOut()}>Logout</Button>
        <AuthContext.Consumer>
          {authContext => <p>{authContext.user.email}</p>}
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default AccountScreen;
