import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminNavbar from '../components/ui/AdminNavbar';
import Navbar from '../components/ui/Navbar';

export default function Logout() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <div>
        <h1>Logout</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
