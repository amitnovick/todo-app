import React from "react";
import { withRouter } from "react-router-dom";

import { AuthContext } from "../../containers/AuthContainer.js";

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
    return (
      <AuthContext.Consumer>
        {context =>
          context.isAuthenticated ? (
            <div>
              <h1>Account Settings</h1>
              <button onClick={() => this.handleLogOut()}>Logout</button>
            </div>
          ) : (
            <h1>Access Denied</h1>
          )
        }
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(AccountSettings);
