import React from 'react';

import { storiesOf } from '@storybook/react';

import TodosContainerDemo from '../containers/Todos/TodosContainerDemo';
/* 
storiesOf('Category', module).add('Subcategory', () => <Jumbotron />)
// */

storiesOf('Components', module).add('TodoScreenDemo', () => (
  <TodosContainerDemo />
));
