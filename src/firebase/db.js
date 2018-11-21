import "firebase/firestore"; // required for the `firebase.firestore` method

import firebaseApp from "./initializeApp.js";

const firestore = firebaseApp.firestore(firebaseApp);
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
