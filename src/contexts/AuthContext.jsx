import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем наличие пользователя в localStorage при загрузке
    const storedUser = localStorage.getItem('agri_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('agri_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // В реальном приложении здесь был бы API-запрос
    // Для демо используем моковые данные
    const mockUser = {
      id: 1,
      email,
      name: 'Фермер Иванов',
      farmName: 'Агрохолдинг "Урожай"',
      role: 'farmer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Farmers',
      token: 'mock-jwt-token-' + Date.now()
    };
    
    setUser(mockUser);
    localStorage.setItem('agri_user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const register = async (userData) => {
    // Моковая регистрация
    const newUser = {
      id: Date.now(),
      ...userData,
      farmName: userData.farmName || 'Новая ферма',
      role: 'farmer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userData.name,
      token: 'mock-jwt-token-' + Date.now()
    };
    
    setUser(newUser);
    localStorage.setItem('agri_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agri_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('agri_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;