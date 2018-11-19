import React from "react";
import { Link } from "react-router-dom";

import LoginModal from "../login-modal/index.js";
import withAuthContext from "../../containers/withAuthContext";

class AccountControl extends React.Component {
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
    const { isModalOpen } = this.state;
    const { isAuthenticated } = this.props;
    return isAuthenticated ? (
      <Link to="/account">My Settings</Link>
    ) : (
      <div>
        <button onClick={() => this.openLoginModal()}>Login</button>
        <LoginModal
          isModalOpen={isModalOpen}
          closeLoginModal={this.closeLoginModal}
        />
      </div>
    );
  }
}

export default withAuthContext(AccountControl);
