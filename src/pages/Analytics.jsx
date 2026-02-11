import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Аналитика</h1>
          <p className="text-gray-600 mt-1">
            Статистика и аналитика по работе хозяйства
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="small">
            Экспорт
          </Button>
          <Button variant="primary" size="small">
            Создать отчет
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Аналитика в разработке</h3>
          <p className="text-gray-600 mb-6">
            Этот раздел находится в разработке. Здесь будут графики урожайности, 
            финансовые отчеты и анализ эффективности.
          </p>
          <Button variant="primary">
            Уведомить о готовности
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;