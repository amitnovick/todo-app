import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

class LoginModal extends React.Component {
  render() {
    const { modalIsOpen, toggle } = this.props;
    return (
      <div>
        <Modal isOpen={modalIsOpen} toggle={toggle} className="my-modal">
          <ModalHeader toggle={toggle}>Pick mode</ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Try out
            </Button>
            <Button color="secondary" onClick={toggle}>
              Login
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
