import 'firebase/firestore'; // required for the `firebase.firestore` method

import { firebaseApp } from './firebaseApp.js';

export const realtimeDb = firebaseApp.firestore();

const settings = { timestampsInSnapshots: true };
realtimeDb.settings(settings);

const ERROR_MSG_MULTIPLE_TABS = `Multiple tab open, persistence can only
  be enabled in one tab at a time.`;

const ERROR_MSG_BROWSER_UNSUPPORTED = `The current browser does not support
  all of the features required to enable persistence`;

realtimeDb.enablePersistence().catch(function(err) {
  if (err.code === 'failed-precondition') {
    console.log(ERROR_MSG_MULTIPLE_TABS);
  } else if (err.code === 'unimplemented') {
    console.log(ERROR_MSG_BROWSER_UNSUPPORTED);
  }
});
