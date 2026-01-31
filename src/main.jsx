import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage, MITPage, StanfordPage, OxfordPage } from './pages';
import './index.css';

/**
 * Main entry point for the Resume Builder application
 * Uses HashRouter for GitHub Pages compatibility
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mit" element={<MITPage />} />
        <Route path="/stanford" element={<StanfordPage />} />
        <Route path="/oxford" element={<OxfordPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
