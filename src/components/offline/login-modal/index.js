import React from "react";
import Modal from "react-modal";

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

    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  render() {
    const { modalIsOpen, closeModal } = this.props;
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={() => closeModal()}>close</button>
          <br />
          <br />
          <br />
          <br />
          <form>
            <button style={{ backgroundColor: "papayawhip" }}>Try out</button>
            <br />
            <button
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
