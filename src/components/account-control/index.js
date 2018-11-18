import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoginModal from "../login-modal/index.js";
import withAuthContext from "../../containers/withAuthContext";

class AccountControl extends Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };

    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  openLoginModal() {
    this.setState({ isModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;
    return this.props.isAuthenticated ? (
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
