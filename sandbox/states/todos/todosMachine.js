//@ts-check
import { Machine } from 'xstate';

const todosMachine = Machine({
  id: 'todo-list',
  initial: 'editingNew',
  states: {
    idle: {
      on: {
        CLICK_EXISTING_TODO_TITLE: {
          target: 'editingExisting',
          actions: 'updateTodosEnterExistingTodoEdit'
        },
        CLICK_NEW_TODO_TEXTBOX: {
          target: 'editingNew'
        },
        CLICK_DELETE_BUTTON: {
          actions: 'deleteTodo'
        },
        CLICK_TOGGLE_BUTTON: {
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
          actions: 'updateEditedTodoValue'
        }
      }
    },
    editingNew: {
      on: {
        EDITING_NEW_HIT_ENTER_KEY: {
          actions: ['createTodoWhenTitleNotEmpty', 'resetNewTodoInput']
        },
        EDITING_NEW_CLICK_AWAY: 'idle',
        EDITING_NEW_INPUT_CHANGE: {
          actions: 'updateNewTodoValue'
        }
      }
    }
  }
});

export default todosMachine;
