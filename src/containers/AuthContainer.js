import React from "react";
import "firebase/auth"; // required for the `firebase.auth` method

import AuthContext from "./AuthContext.js";
import firebaseApp from "../firebase/initializeFirebaseApp.js";

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAwaitingAuth: true,
      userId: null
    };
  }

  _subscribeToAuthChanges = async () => {
    this.setState({ isAwaitingAuth: true });
    const doAfterAuth = user => {
      if (user) {
        this.setState({ isAuthenticated: true });
        this.setState({ userId: user.uid });
      } else {
        this.setState({ isAuthenticated: false });
        this.setState({ userId: null });
      }
      this.setState({ isAwaitingAuth: false });
    };
    this.listener = await firebaseApp.auth().onAuthStateChanged(doAfterAuth);
  };

  componentDidMount() {
    this._subscribeToAuthChanges();
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContainer;
