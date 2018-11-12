import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoginModal from "../login-modal/index.js";

class AccountControl extends Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }

  openLoginModal() {
    this.setState({ isModalOpen: true });
  }

  toggleLoginModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const { isModalOpen } = this.state;
    const { isAuthenticated } = this.props;
    return isAuthenticated ? (
      <Link to="/account">Account Settings</Link>
    ) : (
      <div>
        <button onClick={() => this.openLoginModal()}>Login</button>
        <LoginModal
          isModalOpen={isModalOpen}
          toggleLoginModal={this.toggleLoginModal}
        />
      </div>
    );
  }
}

export default AccountControl;
