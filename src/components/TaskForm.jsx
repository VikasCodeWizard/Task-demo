import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const TaskForm = () => {
  // State to manage the input text for the new task
  const [text, setText] = useState('');

  // Custom hook to access the function for adding tasks
  const { addTask } = useTasks();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Do not add the task if the input is empty or only contains whitespace
    if (!text.trim()) return;

    // Use the addTask function to add the new task and then clear the input
    addTask(text);
    setText(''); // Reset input to an empty string
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Input field for the task description */}
      <input
        type="text"
        value={text} // Controlled component with current input text
        onChange={(e) => setText(e.target.value)} // Update state on input change
        placeholder="Add a new task..." // Placeholder text when input is empty
        aria-label="New Task" // Accessibility label
      />
      {/* Button to submit the form and add the task */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;