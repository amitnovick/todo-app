import React from "react";
import { withRouter } from "react-router-dom";

import {
  provider,
  launchProviderSignInPopupForRecognizedUser,
  launchProviderSignInPopupForUnrecognizedUser
} from "../../firebase/auth.js";
import LoginModal from "./presentational.js";

class LoginModalContainer extends React.Component {
  authHandler = authData => {
    this.props.closeLoginModal();
    if (authData) {
      // this.props.history.push(this.props.location["pathname"]);
      window.location.reload();
    }
  };

  /**
   * Authenticates the user with a social media provider.
   * Either creates a new user account in Firebase or links
   * a different provider to the same user account
   */
  authenticate = () => {
    const providerObject = provider();
    if (this.props.isAwaitingAuth) {
      launchProviderSignInPopupForRecognizedUser(providerObject)
        .then(this.authHandler)
        .catch(err => console.error(err));
    } else {
      launchProviderSignInPopupForUnrecognizedUser(providerObject)
        .then(this.authHandler)
        .catch(err => console.error(err));
    }
  };

  render() {
    return <LoginModal {...this.props} buttonClick={this.authenticate} />;
  }
}

export default withRouter(LoginModalContainer);
