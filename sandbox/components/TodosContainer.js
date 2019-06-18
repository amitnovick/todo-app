import React from 'react';
import uuid from 'uuid/v4';

// import TodoWidgetsWrapper from './TodoWidgetsWrapper/TodoWidgetsWrapper';

const todosReducer = (todos, action) => {
  switch (action.type) {
    case 'CREATE_TODO': {
      const { title } = action.payload;
      const todo = {
        id: uuid(),
        title: title,
        completed: false,
        createdAt: new Date().toISOString()
      };
      return todos.concat([todo]);
    }
    case 'EDIT_TODO': {
      const { todo, newTitle } = action.payload;
      return todos.map(t => (t !== todo ? t : { ...t, title: newTitle }));
    }
    case 'TOGGLE_TODO': {
      const { todo } = action.payload;
      return todos.map(t =>
        t !== todo ? t : { ...t, completed: !t.completed }
      );
    }
    case 'DELETE_TODO': {
      const { todo } = action.payload;
      return todos.filter(t => t.id !== todo.id);
    }
    default:
      return todos;
  }
};

// const StatefulContainer = () => {
//   const [todos, setTodos] = React.useState([]);

//   const connect = (mapStateToSelectorProps, methodProps) => {
//     const selectorProps = getSelectorProps(mapStateToSelectorProps, todos);
//     const dispatch = action => {
//       const newTodos = todosReducer(todos, action);
//       setTodos(newTodos);
//     };
//     const actionProps = getActionProps(methodProps, dispatch);
//     return (Component =>
//       () => <Component {...selectorProps} {...actionProps} />)
//   }

//   const getSelectorProps = (mapStateToSelectorProps, state) => {
//     const selectorProps = ...
//     return selectorProps
//   }

//   const getActionProps = (methodProps, dispatch) => {
//     const actionProps = Object.getOwnPropertyNames(methodProps).reduce(methodProp => {
//       const action = methodProps[methodProp];
//       return {methodProp: (args) => dispatch(action(args))}
//     });
//     return actionProps;
//   }

//   const createTodo = title =>
//   ({
//     type: 'CREATE_TODO',
//     payload: {
//       title
//     }
//   });

//   const editTodo = (todo, newTitle) =>
//   ({
//     type: 'EDIT_TODO',
//     payload: {
//       todo,
//       newTitle
//     }
//   });

//   const toggleTodo = todo =>
//   ({
//     type: 'TOGGLE_TODO',
//     payload: {
//       todo
//     }
//   });

//   const deleteTodo = todo =>
//   ({
//     type: 'DELETE_TODO',
//     payload: {
//       todo
//     }
//   });

//   return connectAction({
//     createTodo, editTodo, toggleTodo, deleteTodo
//   })(TodoWidgetsWrapper)

// }

// export default StatefulContainer;
