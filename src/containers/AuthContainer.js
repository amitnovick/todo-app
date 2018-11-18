import React from "react";

import { auth } from "../auth/oauth.js";
import Layout from "../layout/index.js";

export const AuthContext = React.createContext();

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
    return (
      <AuthContext.Provider value={{ isAuthenticated, signOut: this.signOut }}>
        <Layout />
      </AuthContext.Provider>
    );
  }

  signOut() {
    auth.getAuth().signOut();
  }
}

export default AuthContainer;
