import React, {useEffect, useState} from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../hooks/useTasks';
const TaskList = () => {
  const { tasks, toggleTask, activeFilter, setFilter, completedCount, totalCount } = useTasks();
  
  // Add a bug where counts are cached and not updated properly
  const [cachedCounts, setCachedCounts] = useState({
    total: totalCount,
    completed: completedCount
  });
  
  // Only update counts when filter changes, not when tasks change
  useEffect(() => {
    setCachedCounts({
      total: totalCount,
      completed: completedCount
    });
  }, [activeFilter]); // Missing dependency - should include totalCount and completedCount
  
  return (
    <div className="task-list">
      <div className="filters">
        <button 
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({cachedCounts.total})
        </button>
        <button 
          className={activeFilter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({cachedCounts.total - cachedCounts.completed})
        </button>
        <button 
          className={activeFilter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({cachedCounts.completed})
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <div className="tasks">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
