import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Insights from './pages/Insights';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;