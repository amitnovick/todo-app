import React from "react";
import { Link } from "react-router-dom";

import LoginModal from "../login-modal/index.js";

const AccountControl = ({
  // grandparent state
  isAuthenticated,
  // container state
  isModalOpen,
  // container methods
  closeLoginModal,
  openLoginModal
}) =>
  isAuthenticated ? (
    <Link to="/account">My Settings</Link>
  ) : (
    <div>
      <button onClick={() => openLoginModal()}>Login</button>
      <LoginModal isModalOpen={isModalOpen} closeLoginModal={closeLoginModal} />
    </div>
  );

export default AccountControl;
