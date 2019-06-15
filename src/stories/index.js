import React from 'react';

import { storiesOf } from '@storybook/react';

import TodoScreen from '../components/TodosScreen2/TodosScreen';
import TodosContainerDemo from '../containers/Todos/TodosContainerDemo';
/* 
storiesOf('Category', module).add('Subcategory', () => <Jumbotron />)
// */

storiesOf('Components', module).add('TodoScreenDemo', () => (
  <TodosContainerDemo />
));

const mockFunction = () => {};
const mockTodos = [];

storiesOf('Components', module).add('TodoScreen', () => (
  <TodoScreen
    createTodo={mockFunction}
    editTodo={mockFunction}
    deleteTodo={mockFunction}
    toggleTodo={mockFunction}
    todos={mockTodos}
  />
));
