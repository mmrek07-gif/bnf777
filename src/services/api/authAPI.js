import axiosInstance from './axiosConfig';

export const authAPI = {
  login: async (email, password) => {
    // Временная заглушка для демо
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: 1,
              email,
              name: 'Фермер Иванов',
              farmName: 'Агрохолдинг "Урожай"',
              role: 'farmer',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
            },
            token: 'mock-jwt-token-' + Date.now()
          }
        });
      }, 500);
    });
    
    // В реальном приложении:
    // return axiosInstance.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: Date.now(),
              ...userData,
              farmName: userData.farmName || 'Новая ферма',
              role: 'farmer',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userData.name,
            },
            token: 'mock-jwt-token-' + Date.now()
          }
        });
      }, 500);
    });
    
    // В реальном приложении:
    // return axiosInstance.post('/auth/register', userData);
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('agri_user');
    return Promise.resolve();
  },

  updateProfile: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            user: userData
          }
        });
      }, 500);
    });
  },

  forgotPassword: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true, message: 'Инструкции отправлены на email' }
        });
      }, 500);
    });
  },

  resetPassword: async (token, newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true, message: 'Пароль успешно изменен' }
        });
      }, 500);
    });
  }
};