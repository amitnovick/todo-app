import React from "react";
import { auth } from "../../auth/oauth.js";

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    auth.getAuth().signOut();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <h1>Account Settings</h1>
        <button onClick={() => this.handleLogOut()}>Logout</button>
      </div>
    );
  }
}

export default AccountSettings;
