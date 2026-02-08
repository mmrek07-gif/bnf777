// app.js - Основное приложение
class FarmApp {
    constructor() {
        this.currentPage = 'home';
        this.modalActive = false;
        this.init();
    }
    
    init() {
        console.log('Инициализация приложения...');
        
        // Инициализация навигации
        this.initNavigation();
        
        // Инициализация меню
        this.initMenu();
        
        // Инициализация языков
        this.initLanguages();
        
        // Инициализация кнопок на главной
        this.initHomeButtons();
        
        // Загрузка данных
        this.loadData();
        
        // Обновление статистики
        this.updateStats();
        
        // Показать главную страницу
        this.showPage('home');
        
        console.log('Приложение успешно инициализировано');
    }
    
    initNavigation() {
        // Навигация по ссылкам
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.showPage(page);
                
                // Обновление активного класса
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Закрытие мобильного меню
                this.closeMobileMenu();
            });
        });
        
        // Кнопки "Назад"
        const backButtons = document.querySelectorAll('.btn-back');
        backButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = btn.dataset.backTo || 'fields';
                this.showPage(targetPage);
            });
        });
        
        // Логотип на главную
        document.querySelector('.logo').addEventListener('click', () => {
            this.showPage('home');
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('[data-page="home"]').classList.add('active');
        });
    }
    
    initMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const closeMenu = document.getElementById('close-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Закрытие меню по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    initLanguages() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.changeLanguage(lang);
                
                // Обновление активного класса
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    changeLanguage(lang) {
        console.log('Изменение языка на:', lang);
        
        // Установка атрибута lang у html
        document.documentElement.lang = lang;
        
        // Обновление заголовка страницы
        const titles = {
            ru: 'СельхозУчет - Умная ферма',
            kg: 'Айыл чарба эсеби - Акылдуу ферма',
            ko: '농업 회계 - 스마트 팜'
        };
        document.title = titles[lang] || titles.ru;
        
        // Обновление текста через i18n
        if (typeof i18n !== 'undefined') {
            i18n.setLanguage(lang);
        }
        
        // Сохранение выбора языка
        localStorage.setItem('preferred_language', lang);
        
        // Анимация перехода
        document.querySelectorAll('.page').forEach(page => {
            if (page.classList.contains('active')) {
                page.style.animation = 'none';
                setTimeout(() => {
                    page.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
        });
    }
    
    initHomeButtons() {
        // Быстрое добавление поля
        document.getElementById('quick-add-field')?.addEventListener('click', () => {
            if (typeof fieldManager !== 'undefined') {
                fieldManager.showAddFieldModal();
            }
        });
        
        // Быстрое добавление животного
        document.getElementById('quick-add-animal')?.addEventListener('click', () => {
            if (typeof animalManager !== 'undefined') {
                animalManager.showAddAnimalModal();
            }
        });
        
        // Быстрое добавление теплицы
        document.getElementById('quick-add-greenhouse')?.addEventListener('click', () => {
            if (typeof greenhouseManager !== 'undefined') {
                greenhouseManager.showAddGreenhouseModal();
            }
        });
    }
    
    showPage(pageName) {
        console.log('Переход на страницу:', pageName);
        
        // Скрыть все страницы
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Показать целевую страницу
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 10);
            
            // Прокрутка вверх
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Инициализация страницы
            this.initPage(pageName);
        }
        
        this.currentPage = pageName;
    }
    
    initPage(pageName) {
        switch(pageName) {
            case 'fields':
                if (typeof fieldManager !== 'undefined') {
                    fieldManager.loadFields();
                }
                break;
            case 'animals':
                if (typeof animalManager !== 'undefined') {
                    animalManager.loadAnimals();
                }
                break;
            case 'greenhouses':
                if (typeof greenhouseManager !== 'undefined') {
                    greenhouseManager.loadGreenhouses();
                }
                break;
            case 'weather':
                if (typeof weatherManager !== 'undefined') {
                    weatherManager.loadWeather();
                }
                break;
            case 'ai':
                if (typeof aiAssistant !== 'undefined') {
                    aiAssistant.init();
                }
                break;
        }
    }
    
    loadData() {
        // Загрузка данных из localStorage
        console.log('Загрузка данных...');
        
        // Инициализация хранилища, если его нет
        if (!localStorage.getItem('fields')) {
            localStorage.setItem('fields', JSON.stringify([]));
        }
        if (!localStorage.getItem('animals')) {
            localStorage.setItem('animals', JSON.stringify([]));
        }
        if (!localStorage.getItem('greenhouses')) {
            localStorage.setItem('greenhouses', JSON.stringify([]));
        }
        if (!localStorage.getItem('settings')) {
            localStorage.setItem('settings', JSON.stringify({
                language: 'ru',
                currency: 'RUB',
                notifications: true
            }));
        }
        
        // Загрузка предпочтительного языка
        const savedLang = localStorage.getItem('preferred_language') || 'ru';
        this.changeLanguage(savedLang);
    }
    
    updateStats() {
        const fields = JSON.parse(localStorage.getItem('fields')) || [];
        const animals = JSON.parse(localStorage.getItem('animals')) || [];
        const greenhouses = JSON.parse(localStorage.getItem('greenhouses')) || [];
        
        // Обновление счетчиков
        document.getElementById('field-count').textContent = fields.length;
        document.getElementById('animal-count').textContent = animals.length;
        document.getElementById('greenhouse-count').textContent = greenhouses.length;
        
        // Расчет общей прибыли
        this.calculateTotalProfit();
        
        // Обновление недавней активности
        this.updateRecentActivity();
    }
    
    calculateTotalProfit() {
        let totalProfit = 0;
        
        // Прибыль от полей
        const fields = JSON.parse(localStorage.getItem('fields')) || [];
        fields.forEach(field => {
            const expenses = field.expenses?.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0) || 0;
            const income = field.harvest?.reduce((sum, har) => sum + (parseFloat(har.income) || 0), 0) || 0;
            totalProfit += (income - expenses);
        });
        
        // Прибыль от животных
        const animals = JSON.parse(localStorage.getItem('animals')) || [];
        animals.forEach(animal => {
            const expenses = animal.expenses?.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0) || 0;
            const income = animal.income?.reduce((sum, inc) => sum + (parseFloat(inc.amount) || 0), 0) || 0;
            totalProfit += (income - expenses);
        });
        
        // Прибыль от теплиц
        const greenhouses = JSON.parse(localStorage.getItem('greenhouses')) || [];
        greenhouses.forEach(gh => {
            const expenses = gh.expenses?.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0) || 0;
            const income = gh.harvest?.reduce((sum, har) => sum + (parseFloat(har.income) || 0), 0) || 0;
            totalProfit += (income - expenses);
        });
        
        // Форматирование и отображение
        const profitElement = document.getElementById('total-profit');
        if (profitElement) {
            profitElement.textContent = this.formatCurrency(totalProfit);
            profitElement.style.color = totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        }
    }
    
    updateRecentActivity() {
        const activityList = document.getElementById('recent-activity');
        if (!activityList) return;
        
        activityList.innerHTML = '';
        
        const fields = JSON.parse(localStorage.getItem('fields')) || [];
        const activities = [];
        
        // Сбор активности из полей
        fields.forEach(field => {
            if (field.expenses && field.expenses.length > 0) {
                const lastExpense = field.expenses[field.expenses.length - 1];
                activities.push({
                    type: 'expense',
                    message: `Расход: ${lastExpense.description} - ${this.formatCurrency(lastExpense.amount)}`,
                    date: lastExpense.date,
                    icon: 'fas fa-money-bill-wave'
                });
            }
            
            if (field.harvest && field.harvest.length > 0) {
                const lastHarvest = field.harvest[field.harvest.length - 1];
                activities.push({
                    type: 'harvest',
                    message: `Урожай: ${lastHarvest.quantity} ${lastHarvest.unit} - ${this.formatCurrency(lastHarvest.income)}`,
                    date: lastHarvest.date,
                    icon: 'fas fa-wheat'
                });
            }
        });
        
        // Сортировка по дате
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Отображение последних 5 активностей
        const recentActivities = activities.slice(0, 5);
        
        if (recentActivities.length === 0) {
            activityList.innerHTML = `
                <div class="activity-item">
                    <i class="fas fa-info-circle"></i>
                    <p data-i18n="home.noActivity">Нет недавней активности</p>
                </div>
            `;
            return;
        }
        
        recentActivities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <i class="${activity.icon}"></i>
                <p>${activity.message}</p>
                <span class="activity-date">${new Date(activity.date).toLocaleDateString()}</span>
            `;
            activityList.appendChild(activityItem);
        });
    }
    
    // Модальные окна
    showModal(html) {
        if (this.modalActive) return;
        
        const container = document.getElementById('modals-container');
        container.innerHTML = html;
        
        this.modalActive = true;
        document.body.style.overflow = 'hidden';
        
        // Добавление обработчиков закрытия
        this.initModalCloseHandlers();
    }
    
    initModalCloseHandlers() {
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Закрытие при клике вне модального окна
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalActive) {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const container = document.getElementById('modals-container');
        container.innerHTML = '';
        this.modalActive = false;
        document.body.style.overflow = '';
    }
    
    // Уведомления
    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notifications-container');
        if (!container) {
            const div = document.createElement('div');
            div.id = 'notifications-container';
            document.body.appendChild(div);
            container = div;
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        container.appendChild(notification);
        
        // Автоматическое закрытие
        const autoClose = setTimeout(() => {
            this.closeNotification(notification);
        }, duration);
        
        // Закрытие по клику
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoClose);
            this.closeNotification(notification);
        });
    }
    
    closeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Вспомогательные функции
    formatCurrency(amount) {
        const settings = JSON.parse(localStorage.getItem('settings')) || { currency: 'RUB' };
        const formatter = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: settings.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        return formatter.format(amount || 0);
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    window.app = new FarmApp();
});