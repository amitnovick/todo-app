import React from "react";
import { withRouter } from "react-router-dom";

import { provider } from "../../firebase/auth.js";
import firebaseApp from "../../firebase/initializeApp.js";
import LoginModal from "./presentational.js";

class LoginModalContainer extends React.Component {
  /**
   * Authenticates the user with a social media provider.
   * Either creates a new user account in Firebase or links
   * a different provider to the same user account
   */

  authenticate = () => {
    const providerObject = provider();

    const redirectUserToFullAppFromDemo = () => {
      if (this.props.location.pathname === "/demo")
        this.props.history.push("/");
    };

    if (firebaseApp.auth().currentUser) {
      firebaseApp
        .auth()
        .linkWithPopup(providerObject)
        .then(redirectUserToFullAppFromDemo)
        .catch(err => console.error(err));
    } else {
      firebaseApp
        .auth()
        .signInWithPopup(providerObject)
        .then(redirectUserToFullAppFromDemo)
        .catch(err => console.error(err));
    }

    /*
    TODO: Implement this instead! somehow?

    const signInFunction = firebaseApp.auth().currentUser
      ? firebaseApp.auth().linkWithPopup
      : firebaseApp.auth().signInWithPopup;
    signInFunction(providerObject)
      .then(() => this.props.history.push("/"))
      .catch(err => console.error(err));
     */
  };

  render() {
    return <LoginModal {...this.props} buttonClick={this.authenticate} />;
  }
}

export default withRouter(LoginModalContainer);
