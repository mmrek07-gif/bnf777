import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Fields from './pages/Fields';
import DiaryPage from './pages/DiaryPage';
import CalendarPage from './pages/CalendarPage';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useAuth } from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Приватные маршруты */}
      <Route path="/" element={
        <PrivateRoute>
          <Navigate to="/dashboard" />
        </PrivateRoute>
      } />
      
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      
      <Route path="/fields" element={
        <PrivateRoute>
          <Fields />
        </PrivateRoute>
      } />
      
      <Route path="/diary" element={
        <PrivateRoute>
          <DiaryPage />
        </PrivateRoute>
      } />
      
      <Route path="/calendar" element={
        <PrivateRoute>
          <CalendarPage />
        </PrivateRoute>
      } />
      
      <Route path="/analytics" element={
        <PrivateRoute>
          <Analytics />
        </PrivateRoute>
      } />
      
      <Route path="/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />
      
      {/* Запасной маршрут */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;