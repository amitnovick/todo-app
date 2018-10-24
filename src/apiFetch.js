import { API_URL, SLASH, TODO_TITLE } from "./constants/index.js";
import axios from "axios";

export const uploadServerCreateTodo = (updateLocalDataCreateTodo, title) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);

  axios
    .post(API_URL, params)
    .then(res => {
      const todo = res.data; // { 'id':..., 'title':..., 'completed':... }
      updateLocalDataCreateTodo(todo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const downloadServerReadTodos = updateLocalDataReadTodos => {
  axios
    .get(API_URL)
    .then(res => {
      const todos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
      updateLocalDataReadTodos(todos);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerUpdateTodo = (
  updateLocalDataUpdateTodo,
  newTitle,
  todoId
) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], newTitle);

  axios
    .put(`${API_URL}${todoId.toString()}${SLASH}`, params)
    .then(res => {
      const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
      updateLocalDataUpdateTodo(todoId, updatedTodo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerDeleteTodo = (updateLocalDataDeleteTodo, todoId) => {
  axios
    .delete(`${API_URL}${todoId.toString()}${SLASH}`)
    .then(res => {
      updateLocalDataDeleteTodo(todoId);
    })
    .catch(err => {
      console.log(err);
    });
};
