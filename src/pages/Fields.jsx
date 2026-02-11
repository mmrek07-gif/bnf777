import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input, { TextArea, Select } from '../components/common/Input';
import Modal from '../components/common/Modal';
import { diaryAPI } from '../services/api/diaryAPI';
import { DIARY_CATEGORIES } from '../utils/constants';
import { formatDateTime, formatNumber } from '../utils/helpers';

const DiaryPage = () => {
  const [searchParams] = useSearchParams();
  const fieldId = searchParams.get('fieldId');
  
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filter, setFilter] = useState({
    category: 'all',
    fieldId: fieldId || 'all',
    startDate: '',
    endDate: ''
  });
  
  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    category: 'work',
    fieldId: fieldId || '',
    hours: '',
    workers: '',
    cost: '',
    tags: ''
  });

  // Моковые поля для выбора
  const fields = [
    { id: 1, name: 'Северное поле' },
    { id: 2, name: 'Южное поле' },
    { id: 3, name: 'Западное поле' },
    { id: 4, name: 'Восточное поле' },
    { id: 5, name: 'Центральное поле' }
  ];

  useEffect(() => {
    fetchEntries();
  }, [filter]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (filter.category !== 'all') filters.category = filter.category;
      if (filter.fieldId !== 'all') filters.fieldId = parseInt(filter.fieldId);
      if (filter.startDate && filter.endDate) {
        filters.startDate = filter.startDate;
        filters.endDate = filter.endDate;
      }

      const response = await diaryAPI.getEntries(filters);
      setEntries(response.data.entries);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.description.trim()) {
      alert('Пожалуйста, заполните заголовок и описание');
      return;
    }

    try {
      const entryData = {
        ...newEntry,
        hours: newEntry.hours ? parseInt(newEntry.hours) : 0,
        workers: newEntry.workers ? parseInt(newEntry.workers) : 0,
        cost: newEntry.cost ? parseInt(newEntry.cost) : 0,
        tags: newEntry.tags ? newEntry.tags.split(',').map(tag => tag.trim()) : []
      };

      const response = await diaryAPI.createEntry(entryData);
      setEntries([response.data.entry, ...entries]);
      setNewEntry({
        title: '',
        description: '',
        category: 'work',
        fieldId: fieldId || '',
        hours: '',
        workers: '',
        cost: '',
        tags: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating diary entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      try {
        await diaryAPI.deleteEntry(id);
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (error) {
        console.error('Error deleting diary entry:', error);
      }
    }
  };

  const getCategoryInfo = (categoryId) => {
    return DIARY_CATEGORIES.find(cat => cat.id === categoryId) || DIARY_CATEGORIES[0];
  };

  const getFieldName = (fieldId) => {
    const field = fields.find(f => f.id === fieldId);
    return field ? field.name : 'Общее';
  };

  const calculateStats = () => {
    const stats = {
      totalEntries: entries.length,
      totalHours: entries.reduce((sum, entry) => sum + entry.hours, 0),
      totalCost: entries.reduce((sum, entry) => sum + entry.cost, 0),
      totalWorkers: entries.reduce((sum, entry) => sum + entry.workers, 0),
      byCategory: {}
    };

    entries.forEach(entry => {
      if (!stats.byCategory[entry.category]) {
        stats.byCategory[entry.category] = 0;
      }
      stats.byCategory[entry.category]++;
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопки */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Рабочий дневник</h1>
          <p className="text-gray-600 mt-1">
            Записи о работах на полях и наблюдениях
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="small" onClick={() => setIsModalOpen(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Новая запись
          </Button>
          
          <Button variant="primary" size="small">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Экспорт
          </Button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Всего записей</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalEntries}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Отработано часов</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Общие затраты</p>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalCost)} ₽</p>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Участвовало работников</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalWorkers}</p>
          </div>
        </Card>
      </div>

      {/* Фильтры */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              value={filter.category}
              onChange={(e) => setFilter({...filter, category: e.target.value})}
            >
              <option value="all">Все категории</option>
              {DIARY_CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              value={filter.fieldId}
              onChange={(e) => setFilter({...filter, fieldId: e.target.value})}
            >
              <option value="all">Все поля</option>
              {fields.map(field => (
                <option key={field.id} value={field.id}>{field.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Input
              type="date"
              placeholder="Дата начала"
              value={filter.startDate}
              onChange={(e) => setFilter({...filter, startDate: e.target.value})}
            />
          </div>
          
          <div>
            <Input
              type="date"
              placeholder="Дата окончания"
              value={filter.endDate}
              onChange={(e) => setFilter({...filter, endDate: e.target.value})}
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Найдено записей: {entries.length}
          </p>
          
          <Button
            variant="ghost"
            size="small"
            onClick={() => setFilter({
              category: 'all',
              fieldId: 'all',
              startDate: '',
              endDate: ''
            })}
          >
            Сбросить фильтры
          </Button>
        </div>
      </Card>

      {/* Категории */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter({...filter, category: 'all'})}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
            filter.category === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        
        {DIARY_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter({...filter, category: category.id})}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center ${
              filter.category === category.id
                ? `${category.color} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name} ({stats.byCategory[category.id] || 0})
          </button>
        ))}
      </div>

      {/* Список записей */}
      {loading ? (
        <Card>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </Card>
      ) : entries.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Записей пока нет</h3>
            <p className="text-gray-600 mb-6">
              {filter.category !== 'all' || filter.fieldId !== 'all' 
                ? 'Попробуйте изменить параметры поиска'
                : 'Добавьте первую запись о работах на полях'
              }
            </p>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Добавить запись
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => {
            const category = getCategoryInfo(entry.category);
            
            return (
              <Card
                key={entry.id}
                hoverable
                onClick={() => setSelectedEntry(entry)}
                className="cursor-pointer hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <div className={`${category.color} text-white w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                      <span className="text-lg">{category.icon}</span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                      <div className="flex items-center flex-wrap gap-2 mt-1">
                        <span className="text-sm text-gray-600">
                          {formatDateTime(entry.date)}
                        </span>
                        {entry.fieldName && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">
                              Поле: {entry.fieldName}
                            </span>
                          </>
                        )}
                        {entry.cropType && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">
                              {entry.cropType}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {entry.cost > 0 && (
                      <span className="text-sm font-medium text-gray-900">
                        {formatNumber(entry.cost)} ₽
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEntry(entry.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-2">{entry.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {entry.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {entry.hours > 0 && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {entry.hours} ч
                      </span>
                    )}
                    {entry.workers > 0 && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {entry.workers} чел
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Модальное окно добавления записи */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Новая запись в дневнике"
        size="large"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Заголовок"
                placeholder="Что было сделано?"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Select
                label="Категория"
                value={newEntry.category}
                onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                options={DIARY_CATEGORIES.map(cat => ({
                  value: cat.id,
                  label: `${cat.icon} ${cat.name}`
                }))}
                required
              />
            </div>
          </div>
          
          <div>
            <Select
              label="Поле"
              value={newEntry.fieldId}
              onChange={(e) => setNewEntry({...newEntry, fieldId: e.target.value})}
              options={[
                { value: '', label: 'Общее' },
                ...fields.map(field => ({
                  value: field.id,
                  label: field.name
                }))
              ]}
            />
          </div>
          
          <div>
            <TextArea
              label="Описание"
              placeholder="Подробное описание работ, наблюдений, проблем..."
              rows={4}
              value={newEntry.description}
              onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Затраченное время (часы)"
              type="number"
              placeholder="0"
              value={newEntry.hours}
              onChange={(e) => setNewEntry({...newEntry, hours: e.target.value})}
            />
            
            <Input
              label="Количество работников"
              type="number"
              placeholder="0"
              value={newEntry.workers}
              onChange={(e) => setNewEntry({...newEntry, workers: e.target.value})}
            />
            
            <Input
              label="Затраты (руб)"
              type="number"
              placeholder="0"
              value={newEntry.cost}
              onChange={(e) => setNewEntry({...newEntry, cost: e.target.value})}
            />
          </div>
          
          <div>
            <Input
              label="Теги (через запятую)"
              placeholder="посев, полив, удобрения"
              value={newEntry.tags}
              onChange={(e) => setNewEntry({...newEntry, tags: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={handleAddEntry}
            >
              Сохранить запись
            </Button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно просмотра записи */}
      <Modal
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        title={selectedEntry?.title}
        size="large"
      >
        {selectedEntry && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className={`${getCategoryInfo(selectedEntry.category).color} text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-xl">{getCategoryInfo(selectedEntry.category).icon}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(selectedEntry.date)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedEntry.fieldName ? `Поле: ${selectedEntry.fieldName}` : 'Общая запись'}
                  </p>
                </div>
              </div>
              
              {selectedEntry.cost > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Затраты</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatNumber(selectedEntry.cost)} ₽
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Описание</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{selectedEntry.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {selectedEntry.hours > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Время работы</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEntry.hours} ч</p>
                </div>
              )}
              
              {selectedEntry.workers > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Работники</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEntry.workers} чел.</p>
                </div>
              )}
              
              {selectedEntry.cropType && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Культура</p>
                  <p className="text-lg font-bold text-gray-900">{selectedEntry.cropType}</p>
                </div>
              )}
            </div>
            
            {selectedEntry.tags && selectedEntry.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Теги</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setSelectedEntry(null)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DiaryPage;