import React, { createContext, useReducer } from 'react';

export const TaskContext = createContext();

// Initial state
const initialState = {
  tasks: [],
  activeFilter: 'all', // 'all', 'completed', 'active'
};

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }]
      };
      case 'TOGGLE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task => {
            if (task.id === action.payload) {
              // Even more problematic: Create a delayed mutation via timeout
              // This creates visual feedback but fails to properly update state
              setTimeout(() => {
                task.completed = !task.completed;
              }, 100);
              
              // Return the same reference without changes
              return task;
            }
            return task;
          })
        };
    case 'SET_FILTER':
      return {
        ...state,
        activeFilter: action.payload
      };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
