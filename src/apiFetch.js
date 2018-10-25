import {
  API_URL,
  SLASH,
  TODO_TITLE,
  TODO_COMPLETED
} from "./constants/index.js";
import axios from "axios";

export const uploadServerCreateTodo = (callbackCreateTodo, title) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);

  axios
    .post(API_URL, params)
    .then(res => {
      const todo = res.data; // { 'id':..., 'title':..., 'completed':... }
      callbackCreateTodo(todo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const downloadServerReadTodos = callbackReadTodos => {
  axios
    .get(API_URL)
    .then(res => {
      const todos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
      callbackReadTodos(todos);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerUpdateTodo = (
  callbackUpdateTodo,
  newTitle,
  todoID
) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], newTitle);

  axios
    .put(`${API_URL}${todoID.toString()}${SLASH}`, params)
    .then(res => {
      const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
      callbackUpdateTodo(todoID, updatedTodo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerToggleTodo = (
  callbackToggleTodo,
  title,
  newCompletedValue,
  todoID
) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);
  params.append([TODO_COMPLETED], newCompletedValue);

  axios
    .put(`${API_URL}${todoID.toString()}${SLASH}`, params)
    .then(res => {
      const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
      callbackToggleTodo(todoID, updatedTodo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerDeleteTodo = (callbackDeleteTodo, todoID) => {
  axios
    .delete(`${API_URL}${todoID.toString()}${SLASH}`)
    .then(res => {
      callbackDeleteTodo(todoID);
    })
    .catch(err => {
      console.log(err);
    });
};
