import firebase from "@firebase/app";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyB1lvgQogOTA_RTvzcsaPy4y_wbTz4Yluo",
  authDomain: "quick-todo-5d32e.firebaseapp.com",
  databaseURL: "https://quick-todo-5d32e.firebaseio.com",
  projectId: "quick-todo-5d32e",
  storageBucket: "quick-todo-5d32e.appspot.com",
  messagingSenderId: "938996535704"
};

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
