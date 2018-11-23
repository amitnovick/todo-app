import React from "react";
import { withRouter } from "react-router-dom";

import auth, { provider } from "../../firebase/auth.js";
import withAuthContext from "../../containers/withAuthContext.js";
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
    if (this.props.isAuthenticated) {
      auth.currentUser
        .linkWithPopup(providerObject)
        .then(this.authHandler)
        .catch(err => console.error(err));
    } else {
      auth
        .signInWithPopup(providerObject)
        .then(this.authHandler)
        .catch(err => console.error(err));
    }
  };

  render() {
    return <LoginModal {...this.props} buttonClick={this.authenticate} />;
  }
}

export default withAuthContext(withRouter(LoginModalContainer));
