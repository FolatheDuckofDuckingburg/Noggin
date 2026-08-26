import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Games from './pages/Games';
import ActivityFeed from './pages/ActivityFeed';
import CommunicationBoard from './pages/CommunicationBoard';
import AccessibilitySettings from './pages/AccessibilitySettings';
import NoggimigoChat from './pages/NoggimigoChat';
import { AccessibilityProvider } from './lib/AccessibilityContext';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/student" element={<ActivityFeed />} />
          <Route path="/games" element={<Games />} />
          <Route path="/chat" element={<NoggimigoChat />} />
          <Route path="/communication" element={<CommunicationBoard />} />
          <Route path="/settings" element={<AccessibilitySettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  </React.StrictMode>
);
