import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold">Task Manager</h2>
          <p className="mt-2 text-lg text-gray-400">A Professional Task Management Application</p>
        </div>

        {/* Middle Section: Links */}
        <div className="flex space-x-6 justify-center md:justify-start">
          <a href="#about" className="text-gray-400 hover:text-white transition">About</a>
          <a href="#privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
          <a href="#terms" className="text-gray-400 hover:text-white transition">Terms & Conditions</a>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex space-x-6 justify-center md:justify-end">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-gray-400 hover:text-white transition text-2xl" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-gray-400 hover:text-white transition text-2xl" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-gray-400 hover:text-white transition text-2xl" />
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Task Manager. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
