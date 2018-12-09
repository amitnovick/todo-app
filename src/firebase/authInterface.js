import "firebase/auth"; // required dependency for the `.auth()` accessor

import firebaseApp from "./initializeFirebaseApp.js";

const _authenticateWithGithub = async () => {
  return await new firebaseApp.firebase_.auth.GithubAuthProvider();
};

export const linkWithPopup = async () => {
  const provider = await _authenticateWithGithub();
  firebaseApp.auth().linkWithPopup(provider);
};

export const signInWithPopup = async () => {
  const provider = await _authenticateWithGithub();
  firebaseApp.auth().signInWithPopup(provider);
};

export const signOut = () => {
  firebaseApp.auth().signOut();
};
