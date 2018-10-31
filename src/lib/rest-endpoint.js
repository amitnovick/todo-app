import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/todos/";
const SLASH = "/";
const TODO_TITLE = "title";
const TODO_COMPLETED = "completed";

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
  todoID,
  todoCompleted
) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], newTitle);
  params.append([TODO_COMPLETED], todoCompleted);

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
