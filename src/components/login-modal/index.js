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
    transform: "translate(-50%, -50%)"
  }
};

class LoginModal extends React.Component {
  render() {
    const { modalIsOpen, toggleModal } = this.props;
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => toggleModal()}
          contentLabel="Example Modal"
          style={customStyles}
          // className="Modal"
          // overlayClassName="Overlay"
        >
          <button
            onClick={() => toggleModal()}
            style={{
              color: "red",
              fontSize: 40
            }}
          >
            ×
          </button>
          <h2>Pick mode</h2>
          <form>
            <button
              type="button"
              onClick={() => toggleModal()}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                margin: "8px",
                marginRight: "2px"
              }}
            >
              Try out
            </button>
            <button
              type="button"
              onClick={() => toggleModal()}
              style={{
                backgroundColor: "palevioletred",
                color: "white",
                padding: "5px",
                margin: "8px"
              }}
            >
              Login
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
