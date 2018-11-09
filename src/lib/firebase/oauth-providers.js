/**
 * Internal dependencies
 */
import firebaseApp from "./firebase-oauth.js";

export const getAuth = () => {
  return firebaseApp.auth();
};

export const githubOAuth = () => {
  return new firebaseApp.firebase_.auth.GithubAuthProvider();
};
