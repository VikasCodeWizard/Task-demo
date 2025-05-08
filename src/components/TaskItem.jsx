import React, { memo, useEffect, useState } from 'react';

const taskPropsAreEqual = (prevProps, nextProps) => {
  // Buggy implementation - only checks ID equality, not the completed status
  return prevProps.task.id === nextProps.task.id;
};

const TaskItem = memo(({ task, onToggle }) => {
  console.log(`TaskItem rendering: ${task.id}`);
  
  // Add local state that appears to work but doesn't sync with parent
  const [localCompleted, setLocalCompleted] = useState(task.completed);
  
  // Update local state on initial render only
  useEffect(() => {
    setLocalCompleted(task.completed);
  }, []);  // Missing dependency - should have task.completed
  
  const handleToggle = () => {
    // Update local state immediately for visual feedback
    setLocalCompleted(!localCompleted);
    // Then call the actual toggle function
    onToggle(task.id);
  };
  
  return (
    <div className={`task-item ${localCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={localCompleted}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: localCompleted ? 'line-through' : 'none' }}>
        {task.text}
      </span>
    </div>
  );
}, taskPropsAreEqual); // The buggy equality function

export default TaskItem;
