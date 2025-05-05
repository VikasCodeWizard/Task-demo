import React from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../hooks/useTasks';

const TaskList = () => {
  const { tasks, toggleTask, activeFilter, setFilter, completedCount, totalCount } = useTasks();
  
  return (
    <div className="task-list">
      <div className="filters">
        <button 
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({totalCount})
        </button>
        <button 
          className={activeFilter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({totalCount - completedCount})
        </button>
        <button 
          className={activeFilter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
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
