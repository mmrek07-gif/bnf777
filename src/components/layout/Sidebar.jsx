import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    {
      title: 'Главная',
      items: [
        { to: '/dashboard', icon: '🏠', label: 'Дашборд' },
        { to: '/fields', icon: '🌱', label: 'Поля' },
        { to: '/diary', icon: '📓', label: 'Дневник' },
        { to: '/calendar', icon: '📅', label: 'Календарь' },
      ]
    },
    {
      title: 'Аналитика',
      items: [
        { to: '/analytics', icon: '📊', label: 'Аналитика' },
        { to: '/reports', icon: '📈', label: 'Отчеты' },
        { to: '/forecasts', icon: '🔮', label: 'Прогнозы' },
      ]
    },
    {
      title: 'Планирование',
      items: [
        { to: '/tasks', icon: '✅', label: 'Задачи' },
        { to: '/work-plan', icon: '📋', label: 'План работ' },
        { to: '/resources', icon: '🚜', label: 'Ресурсы' },
      ]
    },
    {
      title: 'Справочники',
      items: [
        { to: '/crops', icon: '🌾', label: 'Культуры' },
        { to: '/equipment', icon: '⚙️', label: 'Техника' },
        { to: '/employees', icon: '👨‍🌾', label: 'Сотрудники' },
        { to: '/suppliers', icon: '🤝', label: 'Поставщики' },
      ]
    }
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 overflow-y-auto">
      {/* Фермерская информация */}
      {user && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full border-4 border-primary-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.farmName}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Уровень активности</span>
              <span className="text-sm font-medium text-primary-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Навигация */}
      <div className="p-4 space-y-6">
        {navItems.map((section, index) => (
          <div key={index}>
            <h4 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {section.title}
            </h4>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium border-l-4 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`
                  }
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Погода и статус */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Погода сейчас</h4>
            <span className="text-2xl">☔</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">2°C</p>
          <p className="text-sm text-gray-600 mt-1">Частично облачно, Bishkek</p>
          <div className="flex items-center mt-3 text-sm">
            <span className="text-gray-600 mr-4">💨 2.4 км/ч</span>
            <span className="text-gray-600">💧 65%</span>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Быстрые действия</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200">
            <span className="font-medium">➕ Новая запись</span>
            <span>📝</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200">
            <span className="font-medium">🌱 Добавить поле</span>
            <span>➕</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all duration-200">
            <span className="font-medium">📊 Создать отчет</span>
            <span>📈</span>
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Краткая статистика</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Активных полей</span>
            <span className="font-semibold text-gray-900">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Задач на сегодня</span>
            <span className="font-semibold text-gray-900">0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Расходы за месяц</span>
            <span className="font-semibold text-gray-900">0 som</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Прогноз урожая</span>
            <span className="font-semibold text-gray-900">0</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;