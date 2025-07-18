import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const TaskForm = () => {
  const [text, setText] = useState('');
  const { addTask } = useTasks();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
