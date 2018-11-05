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

export const uploadServerUpdateTodo = (newTitle, todoID, todoCompleted) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], newTitle);
  params.append([TODO_COMPLETED], todoCompleted);

  return axios.put(`${API_URL}${todoID.toString()}${SLASH}`, params);
};

export const uploadServerToggleTodo = (title, newCompletedValue, todoID) => {
  const params = new URLSearchParams();
  params.append([TODO_TITLE], title);
  params.append([TODO_COMPLETED], newCompletedValue);

  return axios.put(`${API_URL}${todoID.toString()}${SLASH}`, params);
};

export const uploadServerDeleteTodo = todoID => {
  return axios.delete(`${API_URL}${todoID.toString()}${SLASH}`);
};
