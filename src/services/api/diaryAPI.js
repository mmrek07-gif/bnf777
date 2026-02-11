import axiosInstance from './axiosConfig';

export const diaryAPI = {
  getEntries: async (filters = {}) => {
    // Моковые данные для демо
    const mockEntries = [
      {
        id: 1,
        date: new Date().toISOString(),
        category: 'work',
        title: 'Вспашка поля №3',
        description: 'Вспахали поле под будущий посев пшеницы. Использовали трактор John Deere 8370R.',
        fieldId: 1,
        fieldName: 'Северное поле',
        cropType: 'Пшеница',
        hours: 4,
        workers: 2,
        cost: 15000,
        attachments: [],
        tags: ['вспашка', 'подготовка', 'трактор']
      },
      {
        id: 2,
        date: new Date(Date.now() - 86400000).toISOString(),
        category: 'observation',
        title: 'Появление всходов',
        description: 'На поле №1 появились первые всходы пшеницы. Процент всхожести примерно 85%.',
        fieldId: 1,
        fieldName: 'Северное поле',
        cropType: 'Пшеница',
        hours: 1,
        workers: 1,
        cost: 0,
        attachments: [],
        tags: ['всходы', 'рост', 'мониторинг']
      },
      {
        id: 3,
        date: new Date(Date.now() - 172800000).toISOString(),
        category: 'problem',
        title: 'Обнаружены вредители',
        description: 'На поле №2 обнаружены колорадские жуки на картофеле. Необходима обработка.',
        fieldId: 2,
        fieldName: 'Южное поле',
        cropType: 'Картофель',
        hours: 2,
        workers: 1,
        cost: 8000,
        attachments: [],
        tags: ['вредители', 'проблема', 'обработка']
      },
      {
        id: 4,
        date: new Date(Date.now() - 259200000).toISOString(),
        category: 'harvest',
        title: 'Сбор урожая пшеницы',
        description: 'Начали сбор урожая пшеницы на поле №1. Предварительный результат 35 ц/га.',
        fieldId: 1,
        fieldName: 'Северное поле',
        cropType: 'Пшеница',
        hours: 8,
        workers: 5,
        cost: 25000,
        attachments: [],
        tags: ['урожай', 'сбор', 'зерно']
      },
      {
        id: 5,
        date: new Date(Date.now() - 345600000).toISOString(),
        category: 'expense',
        title: 'Закупка удобрений',
        description: 'Приобрели удобрения для весенней подкормки полей.',
        fieldId: null,
        fieldName: null,
        cropType: null,
        hours: 0,
        workers: 0,
        cost: 45000,
        attachments: [],
        tags: ['закупка', 'удобрения', 'расходы']
      }
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredEntries = [...mockEntries];
        
        if (filters.category) {
          filteredEntries = filteredEntries.filter(entry => entry.category === filters.category);
        }
        
        if (filters.fieldId) {
          filteredEntries = filteredEntries.filter(entry => entry.fieldId === filters.fieldId);
        }
        
        if (filters.startDate && filters.endDate) {
          const start = new Date(filters.startDate);
          const end = new Date(filters.endDate);
          filteredEntries = filteredEntries.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= start && entryDate <= end;
          });
        }
        
        resolve({
          data: {
            entries: filteredEntries,
            total: filteredEntries.length,
            stats: {
              totalHours: filteredEntries.reduce((sum, entry) => sum + entry.hours, 0),
              totalCost: filteredEntries.reduce((sum, entry) => sum + entry.cost, 0),
              byCategory: filteredEntries.reduce((acc, entry) => {
                acc[entry.category] = (acc[entry.category] || 0) + 1;
                return acc;
              }, {})
            }
          }
        });
      }, 300);
    });
  },

  createEntry: async (entryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            entry: {
              id: Date.now(),
              ...entryData,
              date: new Date().toISOString()
            }
          }
        });
      }, 500);
    });
  },

  updateEntry: async (id, entryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            entry: {
              id,
              ...entryData
            }
          }
        });
      }, 500);
    });
  },

  deleteEntry: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: { success: true }
        });
      }, 300);
    });
  },

  getCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            categories: [
              { id: 'work', name: 'Работы', color: 'bg-blue-500', icon: '👨‍🌾' },
              { id: 'observation', name: 'Наблюдения', color: 'bg-green-500', icon: '👁️' },
              { id: 'problem', name: 'Проблемы', color: 'bg-red-500', icon: '⚠️' },
              { id: 'harvest', name: 'Урожай', color: 'bg-yellow-500', icon: '📊' },
              { id: 'expense', name: 'Расходы', color: 'bg-purple-500', icon: '💰' },
            ]
          }
        });
      }, 200);
    });
  }
};