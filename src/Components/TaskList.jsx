import React, { useState } from 'react';

const TaskList = ({ tasks, toggleComplete, deleteTask, updateTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  // Open modal with the task data
  const openModal = (task) => {
    setSelectedTask(task);
    setNewDescription(task.description); // Preload the current description
    setIsModalOpen(true);
  };

  // Close the modal without saving
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setNewDescription('');
  };

  // Handle the update of task description
  const handleSaveDescription = () => {
    if (selectedTask && newDescription !== selectedTask.description) {
      updateTask(selectedTask.id, newDescription); // Call the passed down updateTask function
    }
    closeModal();
  };

  // Mark the task as completed or undo completion
  const handleCompleteTask = () => {
    if (selectedTask) {
      toggleComplete(selectedTask.id);
      closeModal();
    }
  };

  // Priority colors based on priority level
  const getPriorityColor = (priority) => {
    return priority === 'High'
      ? 'bg-red-100 border-red-500'
      : priority === 'Medium'
      ? 'bg-yellow-100 border-yellow-500'
      : 'bg-green-100 border-green-500';
  };

  // Function to format the due date into a readable format
  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks available</div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-70' : ''}`}
          >
            {/* Task Title with Priority Indicator */}
            <div className="flex items-center">
              <div className={`mr-2 h-4 w-4 rounded-full ${getPriorityColor(task.priority)}`}></div>
              <div className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </div>
            </div>

            {/* Due Date and Category Badges */}
            <div className="flex space-x-4">
              <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-blue-100 rounded-full">
                {formatDueDate(task.dueDate)}
              </span>
              <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full">
                {task.category}
              </span>
            </div>

            {/* Buttons */}
            <div className="space-x-4">
              {/* View Task */}
              <button
                onClick={() => openModal(task)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
              >
                View Task
              </button>

              {/* Toggle Completion */}
              <button
                onClick={() => toggleComplete(task.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>

              {/* Delete Task */}
              <button
                onClick={() => deleteTask(task.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal for viewing and editing task */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            className="bg-white rounded-lg shadow-xl w-11/12 sm:w-2/3 lg:w-1/2 p-8 relative transform scale-95 transition-all duration-300 ease-out hover:scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:text-gray-200"
            >
              <i className="fas fa-times text-xl" />
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              {selectedTask.title}
            </h2>

            {/* Task Status, Priority, Due Date, and Category Badges */}
            <div className="flex flex-wrap justify-center space-x-4 mb-6">
              {/* Task Status Badge */}
              <span
                className={`px-4 py-2 rounded-full text-white ${selectedTask.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
              >
                {selectedTask.completed ? 'Completed' : 'In Progress'}
              </span>

              {/* Priority Badge */}
              <span
                className={`px-4 py-2 rounded-full text-white ${selectedTask.priority === 'High' ? 'bg-red-500' : selectedTask.priority === 'Medium' ? 'bg-orange-500' : 'bg-green-500'}`}
              >
                {selectedTask.priority}
              </span>

              {/* Due Date Badge */}
              <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full">
                Due: {formatDueDate(selectedTask.dueDate)}
              </span>

              {/* Category Badge */}
              <span className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-full">
                {selectedTask.category}
              </span>
            </div>

            <div className="mb-6 text-gray-800">
              <strong>Description:</strong>
              <div className="bg-gray-100 p-4 rounded-lg mt-2">
                {/* Show textarea only when clicked on "Update" */}
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows="4"
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                onClick={handleSaveDescription} // Save the description
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300"
              >
                Save
              </button>

              <button
                onClick={handleCompleteTask} // Complete the task without updating the description
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition duration-300"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
