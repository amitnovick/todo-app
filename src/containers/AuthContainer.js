import React from "react";

import { auth } from "../auth/oauth.js";
import App from "../components/routing/App.js";

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
      <AuthContext.Provider value={isAuthenticated}>
        <App />
      </AuthContext.Provider>
    );
  }
}

export default AuthContainer;
