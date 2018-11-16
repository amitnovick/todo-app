import React, { Component } from "react";

import { auth } from "../auth/oauth.js";

/**
 * HOC that verifies user is authenticated before returning the
 * protected component
 */
export default WrappedComponent => {
  class WithAuthentication extends Component {
    state = {
      isAuthenticated: false
    };

    componentDidMount() {
      auth.getAuth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ isAuthenticated: true });
        }
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isAuthenticated={this.state.isAuthenticated}
        />
      );
    }
  }

  return WithAuthentication;
};
