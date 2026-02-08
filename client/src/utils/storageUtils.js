// Utility functions for managing email analysis history in localStorage

const STORAGE_KEY = 'emailTriageHistory';

export const getAnalysisHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveAnalysis = (analysis) => {
  try {
    const history = getAnalysisHistory();
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      ...analysis,
    };
    history.unshift(newEntry); // Add to beginning (most recent first)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return newEntry;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const clearAnalysisHistory = () => {
  try {
    console.log('clearAnalysisHistory called');
    console.log('Before clear - localStorage key:', localStorage.getItem(STORAGE_KEY) ? 'HAS DATA' : 'EMPTY');
    localStorage.removeItem(STORAGE_KEY);
    console.log('After clear - localStorage key:', localStorage.getItem(STORAGE_KEY) ? 'HAS DATA' : 'EMPTY');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const calculateInsights = () => {
  const history = getAnalysisHistory();

  const insights = {
    totalEmails: history.length,
    byCategory: {},
    byPriority: {},
    recentEmails: history.slice(0, 10), // Last 10 emails
  };

  // Count by category
  history.forEach((email) => {
    const category = email.category || 'Unknown';
    insights.byCategory[category] = (insights.byCategory[category] || 0) + 1;
  });

  // Count by priority
  history.forEach((email) => {
    const priority = email.priority || 'Unknown';
    insights.byPriority[priority] = (insights.byPriority[priority] || 0) + 1;
  });

  return insights;
};
