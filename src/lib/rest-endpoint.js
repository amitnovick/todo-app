import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/todos/";
const SLASH = "/";
const TODO_TITLE = "title";
const TODO_COMPLETED = "completed";

export const uploadServerCreateTodo = title => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);

  return axios.post(API_URL, params);
};

export const downloadServerReadTodos = () => {
  return axios.get(API_URL);
};

export const uploadServerUpdateTodo = (todo, newTitle) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], newTitle);
  params.append([TODO_COMPLETED], todo.completed);

  return axios.put(`${API_URL}${todo.id.toString()}${SLASH}`, params);
};

export const uploadServerToggleTodo = todo => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], todo.title);
  params.append([TODO_COMPLETED], !todo.completed);

  return axios.put(`${API_URL}${todo.id.toString()}${SLASH}`, params);
};

export const uploadServerDeleteTodo = todo => {
  return axios.delete(`${API_URL}${todo.id.toString()}${SLASH}`);
};
