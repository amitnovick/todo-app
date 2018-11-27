import "firebase/auth"; // required for the `firebaseApp.auth` method

import firebaseApp from "./initializeApp.js";

export const githubOAuth = () => {
  return new firebaseApp.firebase_.auth.GithubAuthProvider();
};

export const provider = () => {
  const provider = githubOAuth();
  // provider.addScope("user");
  return provider;
};

// Returns a Promise
export const launchProviderSignInPopupForRecognizedUser = provider =>
  firebaseApp.auth().currentUser.linkWithPopup(provider);

// Returns a Promise
export const launchProviderSignInPopupForUnrecognizedUser = provider =>
  firebaseApp.auth().signInWithPopup(provider);

export const signOut = () => {
  firebaseApp.auth().signOut();
};

export const onAuthStateChanged = doAfterAuth => {
  firebaseApp.auth().onAuthStateChanged(doAfterAuth);
};

export const getUserID = () => {
  return firebaseApp.auth().currentUser.uid;
};
