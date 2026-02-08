import React, { useState, useEffect } from 'react';
import { calculateInsights, clearAnalysisHistory, getAnalysisHistory } from '../utils/storageUtils';
import './Insights.css';

function Insights() {
  const [insights, setInsights] = useState(() => calculateInsights());

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all analysis history?')) {
      console.log('Clearing history...');
      clearAnalysisHistory();
      console.log('After clear, current history:', getAnalysisHistory());
      
      // Update state with empty insights
      const emptyInsights = {
        totalEmails: 0,
        byCategory: {},
        byPriority: {},
        recentEmails: [],
      };
      console.log('Setting empty insights:', emptyInsights);
      setInsights(emptyInsights);
    }
  };

  return (
    <div className="insights-page">
      <h2>Insights</h2>

      <div className="insights-container">
        {/* Total Emails Analyzed */}
        <div className="insights-card">
          <h3>Total Emails Analyzed</h3>
          <p className="big-number">{insights.totalEmails}</p>
        </div>

        {/* Category Breakdown */}
        <div className="insights-card">
          <h3>By Category</h3>
          {Object.keys(insights.byCategory).length === 0 ? (
            <p className="empty-state">No data yet</p>
          ) : (
            <ul className="stat-list">
              {Object.entries(insights.byCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([category, count]) => (
                  <li key={category}>
                    <span className="stat-label">{category}</span>
                    <span className="stat-value">{count}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Priority Breakdown */}
        <div className="insights-card">
          <h3>By Priority</h3>
          {Object.keys(insights.byPriority).length === 0 ? (
            <p className="empty-state">No data yet</p>
          ) : (
            <ul className="stat-list">
              {Object.entries(insights.byPriority)
                .sort((a, b) => {
                  const order = { High: 0, Medium: 1, Low: 2 };
                  return (order[a[0]] || 999) - (order[b[0]] || 999);
                })
                .map(([priority, count]) => (
                  <li key={priority}>
                    <span className="stat-label">{priority}</span>
                    <span className="stat-value">{count}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent Emails */}
      <div className="recent-emails-section">
        <h3>Recent Email Analyses</h3>
        {insights.recentEmails.length === 0 ? (
          <p className="empty-state">No emails analyzed yet. Go to Home to analyze an email.</p>
        ) : (
          <div className="recent-list">
            {insights.recentEmails.map((email) => (
              <div key={email.id} className="email-item">
                <div className="email-header">
                  <span className="email-timestamp">{email.timestamp}</span>
                  <span className={`category-badge ${email.category.toLowerCase()}`}>
                    {email.category}
                  </span>
                  <span className={`priority-badge priority-${email.priority.toLowerCase()}`}>
                    {email.priority}
                  </span>
                </div>
                <p className="email-preview">{email.emailText}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="insights-actions">
        <button onClick={handleClearHistory} className="clear-btn">
          Clear History
        </button>
      </div>
    </div>
  );
}

export default Insights;
