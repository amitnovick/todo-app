import "firebase/auth"; // required for the `firebaseApp.auth` method

import firebaseApp from "./initializeApp.js";

export const githubOAuth = () => {
  return new firebaseApp.firebase_.auth.GithubAuthProvider();
};

const auth = firebaseApp.auth();

export default auth;
