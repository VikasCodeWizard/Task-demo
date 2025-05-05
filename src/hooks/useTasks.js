import { useContext, useCallback, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const { state, dispatch } = useContext(TaskContext);
  
  const { tasks, activeFilter } = state;
  
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
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
