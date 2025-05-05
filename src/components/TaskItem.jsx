import React, { memo } from 'react';

// Using memo for performance optimization, but it will cause issues with shallow object equality
const TaskItem = memo(({ task, onToggle }) => {
  console.log(`TaskItem rendering: ${task.id}`);
  
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
    </div>
  );
});

export default TaskItem;
