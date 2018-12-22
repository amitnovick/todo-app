import React from 'react';
import { Modal, Button, ModalHeader, ModalBody } from 'reactstrap';

import { linkWithPopup, signInWithPopup } from '../firebase/auth.js';
import { withAuthentication } from '../containers/Auth/withAuthentication.js';

class LoginModal extends React.Component {
  /**
   * Authenticates the user with a social media provider.
   * Either creates a new user account in Firebase or links
   * a different provider to the same user account
   */

  authenticate = () => {
    if (this.props.isAuthenticated) {
      linkWithPopup();
    } else {
      signInWithPopup();
    }
  };

  render() {
    const { isModalOpen, closeLoginModal } = this.props;
    return (
      <Modal isOpen={isModalOpen} toggle={() => closeLoginModal()}>
        <ModalHeader toggle={() => closeLoginModal()} />
        <ModalBody>
          <Button
            onClick={() => this.authenticate()}
            color="secondary"
            style={{
              backgroundColor: 'black',
              color: 'white',
              margin: '8px'
            }}
          >
            Sign in with GitHub
          </Button>
          <Button color="success" onClick={() => closeLoginModal()}>
            Continue with Demo
          </Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default withAuthentication(LoginModal);
