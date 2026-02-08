import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-title">Email Triage Assistant</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/insights">Insights</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
