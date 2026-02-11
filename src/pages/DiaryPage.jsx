import React, { useState } from 'react'
import { Calendar as CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('month') // 'month', 'week', 'day'

  const tasks = [
    { id: 1, title: 'Полив пшеницы', date: '2024-01-15', time: '09:00', field: 'Поле №1', priority: 'high' },
    { id: 2, title: 'Внесение удобрений', date: '2024-01-15', time: '11:00', field: 'Поле №2', priority: 'medium' },
    { id: 3, title: 'Проверка техники', date: '2024-01-16', time: '14:00', field: 'Гараж', priority: 'low' },
    { id: 4, title: 'Уборка сада', date: '2024-01-17', time: '10:00', field: 'Сад', priority: 'low' },
    { id: 5, title: 'Закупка семян', date: '2024-01-18', time: '13:00', field: 'Склад', priority: 'high' },
    { id: 6, title: 'Встреча с поставщиком', date: '2024-01-19', time: '15:00', field: 'Офис', priority: 'medium' },
  ]

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return tasks.filter(task => task.date === dateStr)
  }

  const renderMonthView = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    
    const days = []
    
    // Пустые ячейки для первого дня недели
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32"></div>)
    }
    
    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateTasks = getTasksForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()
      
      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-green-50' : ''
          } ${isSelected ? 'ring-2 ring-green-500' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`font-medium ${isToday ? 'text-green-600' : 'text-gray-700'}`}>
              {day}
            </span>
            {dateTasks.length > 0 && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {dateTasks.length}
              </span>
            )}
          </div>
          <div className="space-y-1 overflow-y-auto max-h-24">
            {dateTasks.slice(0, 3).map(task => (
              <div
                key={task.id}
                className={`text-xs p-1 rounded truncate ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
                title={task.title}
              >
                {task.time} {task.title}
              </div>
            ))}
            {dateTasks.length > 3 && (
              <div className="text-xs text-gray-500">+{dateTasks.length - 3} еще</div>
            )}
          </div>
        </div>
      )
    }
    
    return days
  }

  const selectedDateTasks = getTasksForDate(selectedDate)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Календарь работ</h1>
          <p className="text-gray-600 mt-1">Планируйте и отслеживайте сельскохозяйственные работы</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Filter}>
            Фильтр
          </Button>
          <Button icon={Plus}>
            Добавить задачу
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={handlePrevMonth} icon={ChevronLeft} />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                  </h2>
                  <Button variant="outline" onClick={handleNextMonth} icon={ChevronRight} />
                </div>
                <div className="flex gap-2">
                  {['Месяц', 'Неделя', 'День'].map((viewType) => (
                    <button
                      key={viewType}
                      onClick={() => setView(viewType.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        view === viewType.toLowerCase()
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {viewType}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                  <div key={day} className="bg-gray-50 p-3 text-center">
                    <span className="font-medium text-gray-700">{day}</span>
                  </div>
                ))}
                {renderMonthView()}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title={`Задачи на ${formatDate(selectedDate)}`} icon={CalendarIcon}>
            <div className="space-y-3">
              {selectedDateTasks.length > 0 ? (
                selectedDateTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm text-gray-600">{task.time}</span>
                          <span className="text-sm text-gray-600">{task.field}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {task.priority === 'high' ? 'Высокий' : 
                             task.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Нет задач на выбранную дату</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Добавьте новую задачу для планирования работ
                  </p>
                </div>
              )}
              
              <Button variant="outline" className="w-full" icon={Plus}>
                Добавить задачу на эту дату
              </Button>
            </div>
          </Card>

          <Card title="Статистика месяца">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Всего задач</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Выполнено</span>
                <span className="font-semibold text-green-600">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">В процессе</span>
                <span className="font-semibold text-yellow-600">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Просрочено</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Распределение по приоритету</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Высокий</span>
                    </div>
                    <span className="text-sm font-medium">8 задач</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Средний</span>
                    </div>
                    <span className="text-sm font-medium">10 задач</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Низкий</span>
                    </div>
                    <span className="text-sm font-medium">6 задач</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage