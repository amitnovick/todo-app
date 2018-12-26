import 'firebase/auth'; // required dependency for the `.auth()` accessor
// import firebase from 'firebase/app';

import { firebaseApp } from './firebaseApp.js';

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const authenticateWithGithub = () => {
  const provider = new firebaseApp.firebase_.auth.GithubAuthProvider();
  return provider;
};

export const linkWithPopup = () => {
  const provider = authenticateWithGithub();
  firebaseApp
    .auth()
    .linkWithPopup(provider)
    .catch(err => console.log(err));
};

export const signInWithPopup = () => {
  const provider = authenticateWithGithub();
  firebaseApp
    .auth()
    .signInWithPopup(provider)
    .catch(err => console.log(err));
};

export const signOut = () => {
  firebaseApp
    .auth()
    .signOut()
    .catch(err => console.log(err));
};
