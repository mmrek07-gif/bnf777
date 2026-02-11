import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WeatherProvider } from './contexts/WeatherContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';
import { useAuth } from './hooks/useAuth';

// Компонент для отображения основного контента с проверкой авторизации
const AppContent = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка приложения...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Навигация показывается только для авторизованных пользователей */}
      {user && <Navbar />}
      
      <div className="flex flex-1">
        {/* Сайдбар показывается только для авторизованных пользователей */}
        {user && <Sidebar />}
        
        <main className={`flex-1 ${user ? 'p-4 md:p-6' : 'p-0'}`}>
          <AppRoutes />
        </main>
      </div>
      
      {/* Футер показывается только для авторизованных пользователей */}
      {user && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <WeatherProvider>
          <AppContent />
        </WeatherProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;