/**
 * External dependencies
 */
import firebase from "@firebase/app";
import "@firebase/firestore";
/**
 * Internal dependencies
 */
/**
 * @param {object} config Object literal with properties: `apiKey`,
 * `authDomain`, `databaseURL`, `projectId`, `storageBucket`,
 * `messagingSenderId` as given by Firebase dashboard.
 */
import config from "../private/firebase-firestore-config.js";

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const ERROR_MSG_MULTIPLE_TABS = `Multiple tab open, persistence can only
  be enabled in one tab at a time.`;

const ERROR_MSG_BROWSER_UNSUPPORTED = `The current browser does not support
  all of the features required to enable persistence`;

firestore.enablePersistence().catch(function(err) {
  if (err.code === "failed-precondition") {
    console.log(ERROR_MSG_MULTIPLE_TABS);
  } else if (err.code === "unimplemented") {
    console.log(ERROR_MSG_BROWSER_UNSUPPORTED);
  }
});

export default firestore;
