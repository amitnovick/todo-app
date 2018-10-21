import { API_URL, SLASH, TODO_TITLE } from "./constants/index.js";
import axios from "axios";

export const uploadServerCreateTodo = (updateStateCreateTodo, title) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);

  axios
    .post(API_URL, params)
    .then(res => {
      const todo = res.data; // { 'id':..., 'title':..., 'completed':... }
      updateStateCreateTodo(todo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const downloadServerReadTodos = updateStateReadTodos => {
  axios
    .get(API_URL)
    .then(res => {
      const todos = res.data; // [ { 'id':..., 'title':..., 'completed':... }, {...}, ... ]
      updateStateReadTodos(todos);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerUpdateTodo = (
  updateStateUpdateTodo,
  title,
  itemId
) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);

  axios
    .put(`${API_URL}${itemId.toString()}${SLASH}`, params)
    .then(res => {
      const updatedTodo = res.data; // { 'id':..., 'title':..., 'completed':... }
      updateStateUpdateTodo(itemId, updatedTodo);
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadServerDeleteTodo = (updateStateDeleteTodo, itemId) => {
  axios
    .delete(`${API_URL}${itemId.toString()}${SLASH}`)
    .then(res => {
      updateStateDeleteTodo(itemId);
    })
    .catch(err => {
      console.log(err);
    });
};
