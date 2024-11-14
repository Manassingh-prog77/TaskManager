import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    // Validate that all fields are filled
    if (!title.trim() || !description.trim() || !dueDate || !category) {
      setError('Please fill in all the fields. No fields can remain empty.');
      return; // Prevent task from being added
    }

    // Clear error message if validation passes
    setError('');

    // Create the new task object
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      category,
    };

    // Add the task using the provided addTask function
    addTask(newTask);

    // Reset form fields after adding the task
    setTitle('');
    setDescription('');
    setPriority('Low');
    setDueDate('');
    setCategory('Work');
  };

  return (
    <div className="w-full space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Task Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          rows="3"
        />
      </div>

      {/* Priority and Category Section */}
      <div className="flex space-x-4">
        {/* Priority Dropdown */}
        <div className="w-1/2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Task Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="w-1/2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Task Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Due Date Section */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      {/* Add Task Button */}
      <div>
        <motion.button
          onClick={handleAddTask}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Add Task
        </motion.button>
      </div>
    </div>
  );
};

export default TaskInput;
