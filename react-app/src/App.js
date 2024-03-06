import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Authentication components
import SignUp from './modules/Authentication/SignUp';
import Login from './modules/Authentication/Login';
import ForgotPassword from './modules/Authentication/ForgotPassword';
import MedcareApp from './modules/LandingPage';

// Protected routes component
import ProtectedRoute from './authentication_rules/protected_routes';

// Dashboard components
import PatientDashboard from './modules/PatientDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected routes */}
        <Route path="/" element={<MedcareApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
