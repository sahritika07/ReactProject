import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userLogin'); // Remove the token
    window.location.reload();
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">My Dashboard</div>
        <div className="navbar-links">
          <a href="#section1">Section 1</a>
          <a href="#section2">Section 2</a>
          <a href="#section3">Section 3</a>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
      <div className="dashboard-content">
        <section id="section1" className="section">
          <h2>Section 1</h2>
          <p>Content for Section 1 goes here.</p>
        </section>
        <section id="section2" className="section">
          <h2>Section 2</h2>
          <p>Content for Section 2 goes here.</p>
        </section>
        <section id="section3" className="section">
          <h2>Section 3</h2>
          <p>Content for Section 3 goes here.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
