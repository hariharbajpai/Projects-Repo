import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8" />
            <span className="font-bold text-xl">GICPL</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
            <Link to="/about" className="hover:text-indigo-200 transition">About</Link>
            <Link to="/teams" className="hover:text-indigo-200 transition">Teams</Link>
            <Link to="/schedule" className="hover:text-indigo-200 transition">Schedule</Link>
            <Link to="/gallery" className="hover:text-indigo-200 transition">Gallery</Link>
            {isAdmin && (
              <Link to="/live-scoring" className="text-yellow-300 hover:text-yellow-200 transition">Live Scoring</Link>
            )}
            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-100 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-indigo-700">Home</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-indigo-700">About</Link>
              <Link to="/teams" className="block px-3 py-2 rounded-md hover:bg-indigo-700">Teams</Link>
              <Link to="/schedule" className="block px-3 py-2 rounded-md hover:bg-indigo-700">Schedule</Link>
              <Link to="/gallery" className="block px-3 py-2 rounded-md hover:bg-indigo-700">Gallery</Link>
              {isAdmin && (
                <Link to="/live-scoring" className="block px-3 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700">Live Scoring</Link>
              )}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-100"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="block px-3 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-100">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;