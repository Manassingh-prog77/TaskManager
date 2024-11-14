import React, { useState } from 'react';

const Navbar = ({ setSearchQuery, setSortBy, setCategoryFilter }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-white text-2xl font-bold tracking-tight">
          TaskManager Pro
        </div>

        {/* Search, Sort, and Category Filter Section */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tasks"
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />

          {/* Sort By Dropdown */}
          <select
            onChange={handleSortChange}
            className="px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            <option value="">Sort by</option>
            <option value="dueDate">Due Date</option>
            <option value="Priority">Priority</option>
          </select>

          {/* Category Filter Dropdown */}
          <select
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            <option value="">Filter by Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
