import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const Calendar = ({ compact = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month'); // 'month' или 'week'

  // Моковые события
  const mockEvents = [
    {
      id: 1,
      title: 'Посев пшеницы',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      type: 'work',
      field: 'Северное поле',
      duration: 4,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Обработка от вредителей',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
      type: 'work',
      field: 'Южное поле',
      duration: 2,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Полив полей',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      type: 'work',
      field: 'Все поля',
      duration: 6,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Встреча с поставщиком',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      type: 'meeting',
      field: null,
      duration: 1,
      priority: 'low'
    },
    {
      id: 5,
      title: 'Сбор урожая',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      type: 'harvest',
      field: 'Западное поле',
      duration: 8,
      priority: 'high'
    },
    {
      id: 6,
      title: 'Обслуживание техники',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
      type: 'maintenance',
      field: null,
      duration: 3,
      priority: 'medium'
    }
  ];

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    ));
  };

  const getEventsForDay = (day) => {
    return events.filter(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'harvest': return 'bg-yellow-100 text-yellow-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const days = [];

  // Пустые дни в начале месяца
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Дни месяца
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  if (compact) {
    return (
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Календарь работ</h3>
          <Button variant="outline" size="small">
            Подробнее
          </Button>
        </div>
        
        <div className="space-y-3">
          {events
            .filter(event => event.date >= new Date())
            .slice(0, 3)
            .map(event => (
              <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event.type)} mr-3`}>
                  <span className="text-sm font-medium">
                    {event.date.getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.field || 'Общее'}</p>
                </div>
                <span className="text-sm">{getPriorityIcon(event.priority)}</span>
              </div>
            ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Календарь сельхозработ</h2>
          <p className="text-sm text-gray-600 mt-1">
            Планирование и отслеживание работ на полях
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 rounded text-sm font-medium ${
                view === 'month'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 rounded text-sm font-medium ${
                view === 'week'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Неделя
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="small"
              onClick={() => navigateMonth(-1)}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => setCurrentDate(new Date())}
            >
              Сегодня
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => navigateMonth(1)}
            >
              →
            </Button>
          </div>
        </div>
      </div>

      {/* Заголовок месяца */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {formatMonthYear(currentDate)}
        </h3>
      </div>

      {/* Календарь */}
      <div className="mb-6">
        {/* Дни недели */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="text-center py-2">
              <span className="text-sm font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>

        {/* Дни месяца */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();
            
            const dayEvents = day ? getEventsForDay(day) : [];
            
            return (
              <div
                key={index}
                className={`min-h-24 border rounded-lg p-2 ${
                  isToday
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${!day ? 'opacity-30' : ''}`}
              >
                {day && (
                  <>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-primary-700' : 'text-gray-900'
                      }`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`px-2 py-1 rounded text-xs ${getEventColor(event.type)} truncate`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayEvents.length - 2} ещё
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Предстоящие события */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Ближайшие события</h3>
        
        {events
          .filter(event => event.date >= new Date())
          .slice(0, 5)
          .map(event => (
            <div key={event.id} className="flex items-center p-4 border border-gray-200 rounded-lg mb-3 hover:border-gray-300 transition-all duration-200">
              <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${getEventColor(event.type)} mr-4`}>
                <span className="text-sm font-bold">{event.date.getDate()}</span>
                <span className="text-xs">
                  {event.date.toLocaleDateString('ru-RU', { month: 'short' })}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <span className="text-sm">{getPriorityIcon(event.priority)}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {event.field && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.field}
                    </span>
                  )}
                  
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.duration} ч
                  </span>
                </div>
              </div>
              
              <Button variant="outline" size="small">
                Подробнее
              </Button>
            </div>
          ))}
        
        {events.filter(event => event.date >= new Date()).length === 0 && (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-gray-600">Нет предстоящих событий</p>
          </div>
        )}
      </div>

      {/* Легенда */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Легенда</h4>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div>
            <span className="text-sm text-gray-700">Полевые работы</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-100 mr-2"></div>
            <span className="text-sm text-gray-700">Сбор урожая</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-100 mr-2"></div>
            <span className="text-sm text-gray-700">Встречи</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-100 mr-2"></div>
            <span className="text-sm text-gray-700">Обслуживание</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Calendar;