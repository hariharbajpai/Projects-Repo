import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Call logout function to clear user session
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">Welcome, {user?.email}!</p>
      <button
        onClick={handleLogout} // Call handleLogout on button click
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}