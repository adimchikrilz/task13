import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/users" className="text-xl font-bold">User Management System</Link>
          <Link 
            to="/add-user" 
            className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            Add User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;