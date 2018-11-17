import React from "react";

import { auth } from "../auth/oauth.js";
import App from "../components/routing/App.js";

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };

    this.updateAuthentication = this.updateAuthentication.bind(this);
  }

  updateAuthentication() {
    if (!auth.getAuth()) this.setState({ isAuthenticated: false });
    else {
      auth.getAuth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      });
    }
  }

  componentDidMount() {
    this.updateAuthentication();
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <App
        isAuthenticated={isAuthenticated}
        updateAuthentication={this.updateAuthentication}
      />
    );
  }
}

export default AuthContainer;
