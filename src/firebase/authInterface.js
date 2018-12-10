import "firebase/auth"; // required dependency for the `.auth()` accessor

import firebaseApp from "./initializeFirebaseApp.js";

const _authenticateWithGithub = () => {
  const provider = new firebaseApp.firebase_.auth.GithubAuthProvider();
  return provider;
};

export const linkWithPopup = () => {
  const provider = _authenticateWithGithub();
  firebaseApp
    .auth()
    .linkWithPopup(provider)
    .catch(err => console.log(err));
};

export const signInWithPopup = () => {
  const provider = _authenticateWithGithub();
  firebaseApp
    .auth()
    .signInWithPopup(provider)
    .catch(err => console.log(err));
};

export const signOut = () => {
  firebaseApp.auth().signOut();
};
