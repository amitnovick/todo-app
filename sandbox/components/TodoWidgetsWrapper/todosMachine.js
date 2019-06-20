//@ts-check
import { Machine, assign } from 'xstate';

const todosMachine = Machine({
  id: 'todo-list',
  initial: 'editingNew',
  context: {
    newTodoTitle: '',
    editedTodoValue: '',
    todo: {}
  },
  states: {
    idle: {
      on: {
        CLICK_EXISTING_TODO_TITLE: {
          target: 'editingExisting',
          actions: assign({
            editedTodoValue: (_, event) => event.todo.title,
            todo: (_, event) => event.todo
          })
        },
        CLICK_NEW_TODO_TEXTBOX: {
          target: 'editingNew'
        },
        DELETE_ITEM: {
          actions: 'deleteTodo'
        },
        TOGGLE_ITEM: {
          actions: 'toggleTodo'
        }
      }
    },
    editingExisting: {
      on: {
        HIT_ENTER_KEY: {
          target: 'idle',
          actions: 'editTodo'
        },
        EDITING_EXISTING_CLICK_AWAY: {
          target: 'idle',
          actions: 'editTodoWhenEditValueIsDifferent'
        },
        CHANGE_EDITED_TODO_VALUE: {
          actions: assign({ editedTodoValue: (_, event) => event.title })
        }
      }
    },
    editingNew: {
      on: {
        EDITING_NEW_HIT_ENTER_KEY: {
          actions: [
            'createTodoWhenTitleNotEmpty',
            assign({
              newTodoTitle: (_, __) => ''
            })
          ]
        },
        EDITING_NEW_CLICK_AWAY: 'idle',
        EDITING_NEW_INPUT_CHANGE: {
          actions: assign({
            newTodoTitle: (_, event) => event.title
          })
        }
      }
    }
  }
});

export default todosMachine;
