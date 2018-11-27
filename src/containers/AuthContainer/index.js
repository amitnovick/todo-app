import React from "react";

import { onAuthStateChanged } from "../../firebase/auth.js";

export const AuthContext = React.createContext();

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAwaitingAuth: true,
      userID: null
    };
  }

  subscribeToAuthChanges = async () => {
    this.setState({ isAwaitingAuth: true });
    const doAfterAuth = user => {
      if (user) {
        this.setState({ isAuthenticated: true });
        this.setState({ userID: user.uid });
      } else {
        this.setState({ isAuthenticated: false });
        this.setState({ userID: null });
      }
      this.setState({ isAwaitingAuth: false });
    };
    this.listener = await onAuthStateChanged(doAfterAuth);
  };

  componentDidMount() {
    this.subscribeToAuthChanges();
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { isAuthenticated, isAwaitingAuth, userID } = this.state;
    return (
      <AuthContext.Provider value={{ isAuthenticated, isAwaitingAuth, userID }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContainer;
