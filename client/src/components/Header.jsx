import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Simple Blog</h1>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300">All Posts</Link>
        {token && <Link to="/my-posts" className="hover:text-gray-300">My Posts</Link>}
        {token && <Link to="/create" className="hover:text-gray-300">Create Post</Link>}
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;