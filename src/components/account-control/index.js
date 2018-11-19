import React from "react";

import withAuthContext from "../../containers/withAuthContext";
import AccountControl from "./presentational.js";

class AccountControlContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };
  }

  openLoginModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeLoginModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <AccountControl
        {...this.props}
        {...this.state}
        openLoginModal={this.openLoginModal}
        closeLoginModal={this.closeLoginModal}
      />
    );
  }
}

export default withAuthContext(AccountControlContainer);
