import React from 'react';
import { useMachine } from '@xstate/react';

import TodoWidgetWrapper from '../components/TodoWidgetsWrapper/TodoWidgetsWrapper';
import todosMachine from '../states/todos/todosMachine';

const TodosWithMachine = () => {
  const [current, send] = useMachine(todosMachine, { devTools: true });

  return (
    <TodoWidgetWrapper currentTodosMachineStateNode={current} send={send} />
  );
};

export default TodosWithMachine;
