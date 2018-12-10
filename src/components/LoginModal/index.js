import React from "react";
import { withRouter } from "react-router-dom";

import LoginModal from "./presentational.js";
import {
  linkWithPopup,
  signInWithPopup
} from "../../firebase/authInterface.js";

class LoginModalContainer extends React.Component {
  /**
   * Authenticates the user with a social media provider.
   * Either creates a new user account in Firebase or links
   * a different provider to the same user account
   */

  authenticate = () => {
    if (this.props.isSignedIn) {
      linkWithPopup();
    } else {
      signInWithPopup();
    }
  };

  render() {
    return <LoginModal {...this.props} buttonClick={this.authenticate} />;
  }
}

export default withRouter(LoginModalContainer);
