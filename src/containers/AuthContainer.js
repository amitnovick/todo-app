import React from "react";

import { auth } from "../firebase/auth/oauth.js";
import Layout from "../layout/index.js";

export const AuthContext = React.createContext();

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAwaitingResponse: true
    };
  }

  subscribeToAuthChanges = async () => {
    this.setState({ isAwaitingResponse: true });
    await auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
      this.setState({ isAwaitingResponse: false });
    });
  };

  componentDidMount() {
    this.subscribeToAuthChanges();
  }

  render() {
    const { isAuthenticated, isAwaitingResponse } = this.state;
    return (
      <AuthContext.Provider
        value={{ isAuthenticated, isAwaitingResponse, signOut: this.signOut }}
      >
        <Layout />
      </AuthContext.Provider>
    );
  }

  signOut() {
    auth.getAuth().signOut();
  }
}

export default AuthContainer;
