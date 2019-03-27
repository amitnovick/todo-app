import 'firebase/auth'; // required dependency for the `.auth()` accessor

import firebaseApp from './firebaseApp.js';

const authenticateWithGithub = () => {
  // eslint-disable-next-line no-underscore-dangle
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
