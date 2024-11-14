import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from './Components/Footer';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    triggerAlert('Task added successfully');
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    triggerAlert('Task deleted successfully');
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    triggerAlert('Task completed successfully');
  };

  const updateTask = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
    triggerAlert('Description updated successfully');
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByCategory = categoryFilter
    ? filteredTasks.filter((task) => task.category === categoryFilter)
    : filteredTasks;

  const sortedTasks = () => {
    const uncompletedTasks = filteredByCategory.filter((task) => !task.completed);
    const completedTasks = filteredByCategory.filter((task) => task.completed);

    const priorityOrder = { Low: 3, Medium: 2, High: 1 };

    const sortedUncompletedTasks = [...uncompletedTasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const sortedCompletedTasks = [...completedTasks].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return [...sortedUncompletedTasks, ...sortedCompletedTasks];
  };

  const sortByDueDate = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      // If either task has an invalid date, move it to the bottom
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return dateA - dateB; // Sort by earliest due date
    });
  };

  const tasksAfterSort = sortBy === 'dueDate' ? sortByDueDate(sortedTasks()) : sortedTasks();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        setSearchQuery={setSearchQuery}
        setSortBy={setSortBy}
        setCategoryFilter={setCategoryFilter} // Pass category filter to Navbar
      />
      
      {/* Alert message */}
      {showAlert && (
        <div className="fixed top-20 w-full flex justify-center z-50">
          <div className="bg-green-500 text-white text-center py-2 px-4 rounded shadow-lg">
            {alertMessage}
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg space-y-6 md:space-y-0">
        <div className="w-full md:w-1/3 bg-white p-8 shadow-xl flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Task</h2>
          <TaskInput addTask={addTask} />
        </div>

        <div className="w-full md:w-2/3 bg-gray-200 p-8 overflow-auto space-y-6 h-[500px] md:h-[600px]">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Task List</h2>

          <div className="space-y-4 overflow-y-auto max-h-[450px] md:max-h-[500px]">
            <AnimatePresence>
              <motion.div
                key="task-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TaskList
                  tasks={tasksAfterSort}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                  updateTask={updateTask}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
