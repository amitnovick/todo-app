import React from "react";
import { Button } from "reactstrap";

import { signOut } from "../firebase/authInterface.js";

class AccountScreen extends React.Component {
  handleLogOut = () => {
    signOut();
  };

  render() {
    return (
      <div>
        <h1>Account Settings</h1>
        <Button onClick={() => this.handleLogOut()}>Logout</Button>
      </div>
    );
  }
}

export default AccountScreen;
