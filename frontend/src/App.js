import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Components from './Components';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Components.LoginPage setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Components.SignupPage setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Components.Dashboard currentUser={currentUser} setIsAuthenticated={setIsAuthenticated} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/assessments" 
            element={
              isAuthenticated ? 
              <Components.AssessmentsPage currentUser={currentUser} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/progress" 
            element={
              isAuthenticated ? 
              <Components.ProgressPage currentUser={currentUser} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/goals" 
            element={
              isAuthenticated ? 
              <Components.GoalsPage currentUser={currentUser} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/ai-tools" 
            element={
              isAuthenticated ? 
              <Components.AIToolsPage currentUser={currentUser} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/caseload" 
            element={
              isAuthenticated ? 
              <Components.CaseloadPage currentUser={currentUser} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;