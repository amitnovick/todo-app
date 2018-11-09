/**
 * External dependencies
 */
import React from "react";
import ReactDOM from "react-dom";
/**
 * Internal dependencies
 */
import * as serviceWorker from "./serviceWorker";
import AppContainer from "./pages/container.js";

ReactDOM.render(<AppContainer />, document.getElementById("root"));

if (module.hot) module.hot.accept();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
