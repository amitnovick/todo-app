import React from "react";
import { withRouter } from "react-router-dom";

import withAuthContext from "../../containers/withAuthContext";
import AccountSettings from "./presentational.js";

class AccountSettingContainer extends React.Component {
  handleLogOut = () => {
    this.props.signOut();
    this.props.history.push("/");
  };

  render() {
    return <AccountSettings {...this.props} handleLogOut={this.handleLogOut} />;
  }
}

export default withAuthContext(withRouter(AccountSettingContainer));
