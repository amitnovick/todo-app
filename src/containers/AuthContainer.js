import React from "react";

import { auth } from "../auth/oauth.js";
import App from "../components/routing/App.js";

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };

    this.subscribeToAuthChanges = this.subscribeToAuthChanges.bind(this);
  }

  subscribeToAuthChanges() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  componentDidMount() {
    this.subscribeToAuthChanges();
  }

  render() {
    const { isAuthenticated } = this.state;
    return <App isAuthenticated={isAuthenticated} />;
  }
}

export default AuthContainer;
