import React from "react";
import { withRouter } from "react-router-dom";

import withAuthContext from "../../containers/withAuthContext";

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.props.signOut();
    this.props.history.push("/");
  }
  render() {
    return this.props.isAuthenticated ? (
      <div>
        <h1>Account Settings</h1>
        <button onClick={() => this.handleLogOut()}>Logout</button>
      </div>
    ) : (
      <h1>Access Denied</h1>
    );
  }
}

export default withAuthContext(withRouter(AccountSettings));
