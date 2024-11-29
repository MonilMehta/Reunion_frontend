// FILE: src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" p-4 flex flex-col w-full sticky top-0 bg-white z-2">
      <div className="bg-gray-300 border border-black p-4"></div>
      <div className="bg-white border border-black p-4 flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/dashboard" className="text-black text-xl hover:text-gray-700">
            Dashboard
          </Link>
          <Link to="/task-list" className="text-black text-xl hover:text-gray-700">
            Task List 
          </Link>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Logout
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;