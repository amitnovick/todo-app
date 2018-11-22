import React from "react";
import Modal from "react-modal";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
Modal.defaultStyles.overlay.zIndex = 1000;

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }
};

const LoginModal = ({
  // grandparent state
  isModalOpen,
  // grandparent methods
  closeLoginModal,
  // container methods
  buttonClick
}) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeLoginModal()}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <button
          onClick={() => closeLoginModal()}
          style={{
            color: "red",
            fontSize: 40
          }}
        >
          ×
        </button>
        <h2>Login with</h2>
        <form>
          <button
            type="button"
            onClick={() => buttonClick()}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px",
              margin: "8px",
              marginRight: "2px",
              border: "solid"
            }}
          >
            GitHub
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
