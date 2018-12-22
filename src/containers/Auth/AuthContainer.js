import React from 'react';
import 'firebase/auth'; // required for the `firebase.auth` method

import { AuthContext } from './AuthContext.js';
import { firebaseApp } from '../../firebase/firebaseApp.js';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAwaitingAuth: true,
      user: null,
      isAuthenticated: false
    };
  }

  subscribeToAuthChanges = async () => {
    this.setState({ isAwaitingAuth: true });
    this.listener = await firebaseApp
      .auth()
      .onAuthStateChanged(this.updateAuthState);
  };

  updateAuthState = user => {
    if (user) {
      this.setState({ user: user, isAuthenticated: true });
    } else {
      this.setState({ user: null, isAuthenticated: false });
    }
    this.setState({ isAwaitingAuth: false });
  };

  componentDidMount() {
    this.subscribeToAuthChanges();
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
