import React, { Component } from "react";
import { Link } from "react-router-dom";

import LoginModal from "../login-modal/index.js";
import { AuthContext } from "../../containers/AuthContainer.js";

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
    return (
      <AuthContext.Consumer>
        {isAuthenticated =>
          isAuthenticated ? (
            <Link to="/account">Account Settings</Link>
          ) : (
            <div>
              <button onClick={() => this.openLoginModal()}>Login</button>
              <LoginModal
                isModalOpen={isModalOpen}
                openLoginModal={this.openLoginModal}
                closeLoginModal={this.closeLoginModal}
              />
            </div>
          )
        }
      </AuthContext.Consumer>
    );
  }
}

export default AccountControl;
