import React, { memo, useEffect, useState } from 'react';

import React, { memo, useEffect, useState } from 'react';

const taskPropsAreEqual = (prevProps, nextProps) => {
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.task.completed === nextProps.task.completed
  );
};

const TaskItem = memo(({ task, onToggle }) => {
  console.log(`TaskItem rendering: ${task.id}`);

  const [localCompleted, setLocalCompleted] = useState(task.completed);

  useEffect(() => {
    setLocalCompleted(task.completed);
  }, [task.completed]);

  const handleToggle = () => {  // Fixed syntax: replaced `=>` with `() =>`
    setLocalCompleted(!localCompleted);
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
}, taskPropsAreEqual);

export default TaskItem;

