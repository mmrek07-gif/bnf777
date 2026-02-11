import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    farmName: user?.farmName || '',
    notifications: true,
    emailUpdates: true,
    language: 'ru'
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      alert('Настройки сохранены');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600 mt-1">
          Управление настройками аккаунта и системы
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Боковое меню */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Профиль', icon: '👤' },
                { id: 'farm', label: 'Хозяйство', icon: '🏠' },
                { id: 'notifications', label: 'Уведомления', icon: '🔔' },
                { id: 'security', label: 'Безопасность', icon: '🔒' },
                { id: 'integrations', label: 'Интеграции', icon: '🔌' },
                { id: 'billing', label: 'Оплата', icon: '💳' },
                { id: 'advanced', label: 'Расширенные', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>
        
        {/* Основное содержимое */}
        <div className="lg:col-span-3">
          <Card>
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Профиль</h2>
                
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl">👨‍🌾</span>
                  </div>
                  <div>
                    <Button variant="outline" size="small" className="mb-2">
                      Изменить фото
                    </Button>
                    <p className="text-sm text-gray-600">
                      Рекомендуется фото 256x256px в формате JPG, PNG
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Имя"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <Input
                    label="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                  <Input
                    label="Название хозяйства"
                    value={formData.farmName}
                    onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Отмена</Button>
                  <Button variant="primary" onClick={handleSave}>
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Уведомления</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Push-уведомления</p>
                      <p className="text-sm text-gray-600">Получать уведомления в браузере</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={formData.notifications} onChange={() => {}} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email-рассылка</p>
                      <p className="text-sm text-gray-600">Еженедельные отчеты и новости</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={formData.emailUpdates} onChange={() => {}} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="primary" onClick={handleSave}>
                    Сохранить настройки
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Безопасность</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Смена пароля</h3>
                    <div className="space-y-3">
                      <Input
                        type="password"
                        placeholder="Текущий пароль"
                      />
                      <Input
                        type="password"
                        placeholder="Новый пароль"
                      />
                      <Input
                        type="password"
                        placeholder="Подтвердите новый пароль"
                      />
                    </div>
                    <Button variant="primary" className="mt-4">
                      Обновить пароль
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Удаление аккаунта</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      После удаления аккаунта все ваши данные будут безвозвратно удалены.
                    </p>
                    <Button variant="danger">
                      Удалить аккаунт
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'security' && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Раздел в разработке</h3>
                <p className="text-gray-600">
                  Этот раздел настроек находится в разработке и будет доступен в ближайшее время.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;