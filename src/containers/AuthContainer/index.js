import React from "react";

import auth from "../../firebase/auth.js";

export const AuthContext = React.createContext();

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAwaitingAuth: true
    };
  }

  subscribeToAuthChanges = async () => {
    this.setState({ isAwaitingAuth: true });
    await auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
      this.setState({ isAwaitingAuth: false });
    });
  };

  signOut = () => {
    auth.signOut();
  };

  componentDidMount() {
    this.subscribeToAuthChanges();
  }

  render() {
    const { isAuthenticated, isAwaitingAuth } = this.state;
    return (
      <AuthContext.Provider
        value={{ isAuthenticated, isAwaitingAuth, signOut: this.signOut }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContainer;
