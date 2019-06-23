//@ts-check
import { Machine, assign } from 'xstate';
import {
  createTodo,
  editTodo,
  toggleTodo,
  deleteTodo
} from './stateTransformers';
import initialState from './initialState';

const todosMachine = Machine(
  {
    id: 'todo-list',
    initial: 'editingNew',
    context: {
      newTodoTitle: '',
      editedTodoValue: '',
      todo: {},
      todos: initialState
    },
    states: {
      idle: {
        on: {
          CLICK_EXISTING_TODO_TITLE: {
            target: 'editingExisting',
            actions: assign({
              editedTodoValue: (_, { todo }) => todo.title,
              todo: (_, { todo }) => todo
            })
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
            actions: assign({ editedTodoValue: (_, event) => event.title })
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
            actions: assign({
              newTodoTitle: (_, event) => event.title
            })
          }
        }
      }
    }
  },
  {
    actions: {
      createTodoWhenTitleNotEmpty: assign({
        todos: ({ newTodoTitle, todos }, _) =>
          newTodoTitle.length > 0
            ? createTodo(todos, { title: newTodoTitle })
            : todos
      }),
      resetNewTodoInput: assign({
        newTodoTitle: (_, __) => ''
      }),
      editTodo: assign({
        todos: ({ todo, editedTodoValue, todos }, _) =>
          editTodo(todos, { todo, newTitle: editedTodoValue })
      }),
      toggleTodo: assign({
        todos: ({ todos }, { todo }) => toggleTodo(todos, { todo })
      }),
      deleteTodo: assign({
        todos: ({ todos }, { todo }) => deleteTodo(todos, { todo })
      }),
      editTodoWhenEditValueIsDifferent: assign({
        todos: ({ todo, editedTodoValue, todos }, _) =>
          todo.title !== editedTodoValue
            ? editTodo(todos, { todo, newTitle: editedTodoValue })
            : todos
      })
    }
  }
);

export default todosMachine;
