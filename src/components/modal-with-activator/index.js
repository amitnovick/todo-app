import React from "react";

import LoginModal from "../login-modal/index.js";

class ModalWithActivator extends React.Component {
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
    return (
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

export default ModalWithActivator;
