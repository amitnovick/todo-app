import uuid from 'uuid/v4';

const initialState = [
  {
    id: uuid(),
    title: 'Run errands',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Cook dinner',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: uuid(),
    title: 'Do what you really want!',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

export default initialState;
