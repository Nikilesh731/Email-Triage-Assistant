import React, { useState } from 'react';
import { saveAnalysis } from '../utils/storageUtils';
import '../App.css';

function Home() {
  const [emailText, setEmailText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async () => {
    setError(null);
    setAnalysisResult(null);
    setLoading(true);

    if (!emailText.trim()) {
      setError('Please enter email text to analyze.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/analyze-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailText }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze email.');
      }

      const data = await response.json();
      setAnalysisResult(data);

      // Save to localStorage
      const saved = saveAnalysis({
        emailText: emailText.substring(0, 100), // Store first 100 chars as preview
        ...data,
      });
      console.log('Email analysis saved to localStorage:', saved);
      console.log('Current localStorage data:', JSON.parse(localStorage.getItem('emailTriageHistory') || '[]'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <h2>Analyze an Email</h2>
      <textarea
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
        placeholder="Paste your email here..."
        disabled={loading}
      />
      <button onClick={analyzeEmail} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Email'}
      </button>

      {error && <p className="error">{error}</p>}

      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Result</h3>
          <h4>Summary:</h4>
          <ul>
            {analysisResult.summary.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <p>
            <strong>Category:</strong> {analysisResult.category}
          </p>
          <p>
            <strong>Priority:</strong> {analysisResult.priority}
          </p>
          <h4>Suggested Reply:</h4>
          <p>{analysisResult.reply}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
