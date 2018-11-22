import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import withAuthContext from "../../containers/withAuthContext";

class AccountPage extends React.Component {
  handleLogOut = async () => {
    this.props.signOut();
    await window.location.reload();
    this.props.history.push("/");
  };

  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? (
      <div>
        <h1>Account Settings</h1>
        <Button onClick={() => this.handleLogOut()}>Logout</Button>
      </div>
    ) : (
      <h1>Access Denied</h1>
    );
  }
}

export default withAuthContext(withRouter(AccountPage));
