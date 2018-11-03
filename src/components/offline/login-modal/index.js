import React from "react";
import Modal from "react-modal";
import "./style.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class LoginModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={() => closeModal()}>close</button>
          <br />
          <br />
          <br />
          <br />
          <form>
            <button
              type="button"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Try out
            </button>
            <br />
            <button
              type="button"
              style={{ backgroundColor: "palevioletred", color: "white" }}
            >
              or Login
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
