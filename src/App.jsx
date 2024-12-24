import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Dashboard from './Components/Dashboard';

const App = () => {
  const isLoggedIn = localStorage.getItem('userLogin') !== null;

  return (
    <Router>
      <Routes>
        {/* Protected route for Dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Route for Login/SignUp */}
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginSignUp /> : <Navigate to="/dashboard" />}
        />
        {/* Default route */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
