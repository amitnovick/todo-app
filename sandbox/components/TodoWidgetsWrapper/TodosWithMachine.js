import React from 'react';

import TodoWidgetWrapper from './TodoWidgetsWrapper';
import todosMachine from './todosMachine';
import { useMachine } from '@xstate/react';

const TodosWithMachine = () => {
  const [_, __, service] = useMachine(todosMachine);
  return <TodoWidgetWrapper machineService={service} />;
};

export default TodosWithMachine;
