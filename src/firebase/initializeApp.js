import firebase from "firebase/app";

/**
 * @param {object} config Object literal with properties: `apiKey`,
 * `authDomain`, `databaseURL`, `projectId`, `storageBucket`,
 * `messagingSenderId` as given by Firebase dashboard.
 */
import config from "./private/config.js";

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
