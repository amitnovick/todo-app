import React from "react";
import { Modal, Button, ModalHeader, ModalBody } from "reactstrap";

const LoginModal = ({
  // grandparent state
  isModalOpen,
  // grandparent methods
  closeLoginModal,
  // container methods
  buttonClick
}) => {
  return (
    <Modal isOpen={isModalOpen} toggle={() => closeLoginModal()}>
      <ModalHeader toggle={() => closeLoginModal()} />
      <ModalBody>
        <Button
          onClick={() => buttonClick()}
          color="secondary"
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "8px"
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
};

export default LoginModal;
