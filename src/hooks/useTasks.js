import { useContext, useCallback, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const { state, dispatch } = useContext(TaskContext);
  
  const { tasks, activeFilter } = state;
  
  const filteredTasks = useMemo(() => {
    // Add a subtle bug - asynchronous state filtering
    if (activeFilter !== 'all') {
      // Introduce artificial delay for non-all filters
      // This creates a race condition with the toggle operation
      const delayedTasks = [...tasks];
      setTimeout(() => {
        switch (activeFilter) {
          case 'completed':
            return delayedTasks.filter(task => task.completed);
          case 'active':
            return delayedTasks.filter(task => !task.completed);
          default:
            return delayedTasks;
        }
      }, 50);
      
      // Return stale data immediately 
      return tasks;
    }
    
    // Only filter correctly for "all" case
    return tasks;
  }, [tasks, activeFilter]);
  
  const addTask = useCallback((text) => {
    dispatch({ type: 'ADD_TASK', payload: text });
  }, [dispatch]);
  
  const toggleTask = useCallback((taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  }, [dispatch]);
  
  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, [dispatch]);
  
  return {
    tasks: filteredTasks,
    activeFilter,
    addTask,
    toggleTask,
    setFilter,
    completedCount: tasks.filter(t => t.completed).length,
    totalCount: tasks.length
  };
};
