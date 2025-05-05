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
        // BUG: Improper nested state update that causes reference equality issues
        tasks: state.tasks.map(task => {
          if (task.id === action.payload) {
            // Problem: Creates a new shallow copy but modifies the original task object properties
            const taskCopy = task;
            taskCopy.completed = !taskCopy.completed;
            return taskCopy;
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
