// VIEW LAYER: maps URLs to pages. Pages are lazy-loaded so each route only
// downloads the code it needs.

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './authentication_rules/protected_routes';

const MedcareApp = lazy(() => import('./modules/LandingPage'));
const Login = lazy(() => import('./modules/Authentication/Login'));
const SignUp = lazy(() => import('./modules/Authentication/SignUp'));
const ForgotPassword = lazy(() => import('./modules/Authentication/ForgotPassword'));
const Dashboard = lazy(() => import('./modules/Dashboard'));

const DASHBOARDS = [
  { path: '/patient', role: 'patient', title: 'Patient Dashboard' },
  { path: '/provider', role: 'provider', title: 'Provider Dashboard' },
  { path: '/admin', role: 'admin', title: 'Admin Dashboard' },
];

function NotFound() {
  return <h1 className="app-container">Page Not Found</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="app-container">Loading…</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MedcareApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Role-protected routes */}
          {DASHBOARDS.map(({ path, role, title }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute allowedRoles={[role]}><Dashboard title={title} /></ProtectedRoute>}
            />
          ))}

          {/* 404 Error route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
