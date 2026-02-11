import React from 'react';
import { useAuth } from '../hooks/useAuth';
import StatsCard, { StatsGrid } from '../components/dashboard/StatsCard';
import WeatherCard from '../components/dashboard/WeatherCard';
import FieldMap from '../components/dashboard/FieldMap';
import Diary from '../components/dashboard/Diary';
import Calendar from '../components/dashboard/Calendar';
import AIHelper from '../components/dashboard/AIHelper';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { user } = useAuth();

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const statsData = [
    {
      title: 'Общая площадь',
      value: 145.4,
      change: 2.5,
      icon: '🌱',
      color: 'primary',
      formatValue: (v) => `${v} га`
    },
    {
      title: 'Средняя урожайность',
      value: 42.3,
      change: 1.8,
      icon: '📊',
      color: 'success',
      formatValue: (v) => `${v} ц/га`
    },
    {
      title: 'Расходы за месяц',
      value: 325000,
      change: -3.2,
      icon: '💰',
      color: 'warning',
      formatValue: (v) => `${formatNumber(v)} ₽`
    },
    {
      title: 'Задач на неделю',
      value: 18,
      change: 12.5,
      icon: '✅',
      color: 'info',
      formatValue: (v) => v
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Посев пшеницы', field: 'Северное поле', time: '2 часа назад', icon: '🌾' },
    { id: 2, action: 'Полив полей', field: 'Все поля', time: '5 часов назад', icon: '💧' },
    { id: 3, action: 'Внесение удобрений', field: 'Южное поле', time: 'Вчера', icon: '🧪' },
    { id: 4, action: 'Обслуживание техники', field: 'Гараж', time: '2 дня назад', icon: '🔧' },
    { id: 5, action: 'Закупка семян', field: 'Склад', time: '3 дня назад', icon: '🛒' }
  ];

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Добро пожаловать, {user?.name?.split(' ')[0] || 'Фермер'}!
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="small">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Экспорт
          </Button>
          
          <Button variant="primary" size="small">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Новая задача
          </Button>
        </div>
      </div>

      {/* Статистика */}
      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </StatsGrid>

      {/* Основная сетка */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка */}
        <div className="lg:col-span-2 space-y-6">
          {/* Карта полей */}
          <FieldMap />
          
          {/* Дневник */}
          <Diary limit={3} />
          
          {/* Календарь */}
          <Calendar compact={true} />
        </div>

        {/* Правая колонка */}
        <div className="space-y-6">
          {/* Погода */}
          <WeatherCard compact={true} />
          
          {/* AI Помощник */}
          <AIHelper />
          
          {/* Последние активности */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Последние активности</h3>
              <Button variant="ghost" size="small">
                Все →
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{activity.field}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Быстрые действия */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-6">
            <h3 className="font-semibold text-primary-900 mb-4">Быстрые действия</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-white text-primary-700 p-4 rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200">
                <div className="text-2xl mb-2">📝</div>
                <p className="font-medium text-sm">Дневник</p>
              </button>
              
              <button className="bg-white text-primary-700 p-4 rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200">
                <div className="text-2xl mb-2">📊</div>
                <p className="font-medium text-sm">Отчет</p>
              </button>
              
              <button className="bg-white text-primary-700 p-4 rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200">
                <div className="text-2xl mb-2">🌱</div>
                <p className="font-medium text-sm">Поля</p>
              </button>
              
              <button className="bg-white text-primary-700 p-4 rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200">
                <div className="text-2xl mb-2">🚜</div>
                <p className="font-medium text-sm">Техника</p>
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-primary-200">
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Добавить запись
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Прогнозы и аналитика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Погодный прогноз</h3>
            <span className="text-2xl">🌤️</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">На следующей неделе</p>
          <p className="text-lg font-bold text-gray-900">Благоприятно</p>
          <p className="text-sm text-gray-500">+18°C, небольшой дождь</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Урожайность</h3>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Прогноз на сезон</p>
          <p className="text-lg font-bold text-gray-900">+8.5%</p>
          <p className="text-sm text-gray-500">Выше среднего</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Затраты</h3>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">В этом месяце</p>
          <p className="text-lg font-bold text-gray-900">-3.2%</p>
          <p className="text-sm text-gray-500">Экономия 10,500 ₽</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Эффективность</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Работы на полях</p>
          <p className="text-lg font-bold text-gray-900">70%</p>
          <p className="text-sm text-gray-500">Высокий уровень</p>
        </div>
      </div>

      {/* Уведомления и предупреждения */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Важные уведомления</h2>
            <p className="text-sm text-gray-600 mt-1">Требуют вашего внимания</p>
          </div>
          
          <Button variant="outline" size="small">
            Отметить всё прочитанным
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
              <span className="text-yellow-600 text-lg">⚠️</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Требуется полив</p>
              <p className="text-sm text-gray-600">Уровень влажности на поле №3 ниже нормы</p>
            </div>
            <Button variant="primary" size="small">
              Исправить
            </Button>
          </div>
          
          <div className="flex items-center p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-blue-600 text-lg">📅</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Срок обработки</p>
              <p className="text-sm text-gray-600">Завтра истекает срок обработки от вредителей</p>
            </div>
            <Button variant="primary" size="small">
              Запланировать
            </Button>
          </div>
          
          <div className="flex items-center p-4 bg-green-50 border border-green-100 rounded-lg">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-4">
              <span className="text-green-600 text-lg">🌾</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Урожай готов</p>
              <p className="text-sm text-gray-600">Пшеница на поле №1 достигла зрелости</p>
            </div>
            <Button variant="primary" size="small">
              Начать сбор
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;