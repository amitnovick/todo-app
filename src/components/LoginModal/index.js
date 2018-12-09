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
    /* TODO: The redirection responsibility would complect
     this function. find better way to compose the desired flow */

    // const redirectUserToFullAppFromDemo = () => {
    //   if (this.props.location.pathname === "/demo")
    //     this.props.history.push("/");
    // };

    if (this.props.isAuthenticated) {
      linkWithPopup()
        // .then(redirectUserToFullAppFromDemo)
        .catch(err => console.error(err));
    } else {
      signInWithPopup()
        // .then(redirectUserToFullAppFromDemo)
        .catch(err => console.error(err));
    }
  };

  render() {
    return <LoginModal {...this.props} buttonClick={this.authenticate} />;
  }
}

export default withRouter(LoginModalContainer);
