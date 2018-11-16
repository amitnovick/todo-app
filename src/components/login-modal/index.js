import React from "react";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";

import { auth } from "../../auth/oauth.js";
import buttonList from "./initialButtonList.js";

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

class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.authHandler = this.authHandler.bind(this);
  }

  authHandler(authData) {
    if (authData) {
      this.props.history.push(this.props.location["pathname"]);
    }
  }

  /**
   * Authenticates the user with a social media provider.
   * Either creates a new user account in Firebase or links
   * a different provider to the same user account
   */
  authenticate() {
    const providerOAuth = buttonList["github"].provider();

    if (!auth.getAuth().currentUser) {
      auth
        .getAuth()
        .signInWithPopup(providerOAuth)
        .then(this.authHandler)
        .catch(err => console.error(err));
    } else {
      auth
        .getAuth()
        .currentUser.linkWithPopup(providerOAuth)
        .then(this.authHandler)
        .catch(err => console.error(err));
    }
  }

  render() {
    const { isModalOpen, toggleLoginModal } = this.props;
    return (
      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => toggleLoginModal()}
          contentLabel="Example Modal"
          style={customStyles}
          // className="Modal"
          // overlayClassName="Overlay"
        >
          <button
            onClick={() => toggleLoginModal()}
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
              onClick={() => this.authenticate()}
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
  }
}

export default withRouter(LoginModal);