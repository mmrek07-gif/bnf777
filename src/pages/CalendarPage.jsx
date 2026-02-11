import React from 'react';
import Calendar from '../components/dashboard/Calendar';

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Календарь работ</h1>
        <p className="text-gray-600 mt-1">
          Планирование и отслеживание сельскохозяйственных работ
        </p>
      </div>
      
      <Calendar compact={false} />
    </div>
  );
};

export default CalendarPage;