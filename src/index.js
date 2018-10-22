import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import TodoController from "./todoController.js";

const controller = new TodoController();
function render() {
  ReactDOM.render(
    <App controller={controller} />,
    document.getElementById("root")
  );
}

controller.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
