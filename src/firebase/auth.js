import 'firebase/auth'; // required dependency for the `.auth()` accessor
import firebaseApp from './firebaseApp.js';

const authenticateWithGithub = () =>
  new firebaseApp.firebase_.auth.GithubAuthProvider();

export const linkWithPopup = () => {
  const provider = authenticateWithGithub();
  return firebaseApp.auth().currentUser.linkWithPopup(provider);
};

export const signInWithPopup = () => {
  const provider = authenticateWithGithub();
  return firebaseApp.auth().signInWithPopup(provider);
};

export const signOut = () => firebaseApp.auth().signOut();
