import React from "react";

import auth from "../firebase/auth.js";
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
    await auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
      this.setState({ isAwaitingResponse: false });
    });
  };

  signOut = () => {
    auth.signOut();
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
}

export default AuthContainer;
