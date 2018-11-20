import "firebase/auth"; // required for the `firebaseApp.auth` method

import firebaseApp from "../index.js";

export const getAuth = () => {
  return firebaseApp.auth();
};

export const githubOAuth = () => {
  return new firebaseApp.firebase_.auth.GithubAuthProvider();
};
