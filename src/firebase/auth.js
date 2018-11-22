import "firebase/auth"; // required for the `firebaseApp.auth` method

import firebaseApp from "./initializeApp.js";

export const githubOAuth = () => {
  return new firebaseApp.firebase_.auth.GithubAuthProvider();
};

export const provider = () => {
  const provider = githubOAuth();
  provider.addScope("user");
  return provider;
};

export default firebaseApp.auth();
