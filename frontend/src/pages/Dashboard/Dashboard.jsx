import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>LIS Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Pending Tests</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Samples Collected</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>Results Today</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
        <div className="quick-links">
          <h2>Quick Actions</h2>
          <div className="link-grid">
            <a href="/patients" className="quick-link-card">
              <h3>Manage Patients</h3>
              <p>View and manage patient records</p>
            </a>
            <a href="/tests" className="quick-link-card">
              <h3>Test Catalog</h3>
              <p>Browse available tests</p>
            </a>
            <a href="/samples" className="quick-link-card">
              <h3>Sample Tracking</h3>
              <p>Track sample status</p>
            </a>
            <a href="/results" className="quick-link-card">
              <h3>Results</h3>
              <p>View and manage test results</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
