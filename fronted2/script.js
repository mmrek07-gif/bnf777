// script.js - Основной файл JavaScript

class NeoAgroApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.initializeAnimations();
        this.setupLanguageSupport();
    }

    init() {
        console.log('🌿 NEOAGRO инициализирован');
        this.currentPage = 'main';
        this.isDarkMode = false;
        this.loadUserPreferences();
        
        // Инициализация i18n если еще не инициализирован
        if (!window.i18n) {
            console.log('⚠️ i18n не инициализирован, загружаем...');
            this.loadI18n();
        }
    }

    loadI18n() {
        // Загружаем менеджер переводов если он не был загружен
        const script = document.createElement('script');
        script.src = 'i18n.js';
        script.onload = () => {
            console.log('✅ i18n загружен');
            this.setupLanguageSupport();
        };
        document.head.appendChild(script);
    }

    setupLanguageSupport() {
        if (window.i18n) {
            console.log('🌐 Поддержка языков активирована');
            this.i18n = window.i18n;
            this.updateAllDynamicContent();
        }
    }

    bindEvents() {
        // Навигация
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Кнопки действий
        document.querySelector('.contact-button')?.addEventListener('click', () => this.contactExpert());
        document.querySelector('.contest-button')?.addEventListener('click', () => this.showContestInfo());
        document.querySelector('.cta-button')?.addEventListener('click', () => this.launchAI());

        // Языковые кнопки
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLanguageChange(e));
        });

        // Анимация при скролле
        window.addEventListener('scroll', () => this.handleScroll());

        // Адаптивность
        window.addEventListener('resize', () => this.handleResize());
    }

    handleNavigation(e) {
        const item = e.currentTarget;
        
        if (item.classList.contains('cta-button')) return;
        
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(i => {
            i.classList.remove('active');
        });
        
        item.classList.add('active');
        
        const pageName = item.querySelector('.nav-text').textContent.toLowerCase();
        this.currentPage = this.getPageKey(pageName);
        
        console.log(`Переход на страницу: ${this.currentPage}`);
        
        this.animateNavigation(item);
        this.loadPageContent(this.currentPage);
    }

    handleLanguageChange(e) {
        const langBtn = e.currentTarget;
        const lang = langBtn.dataset.lang;
        
        if (this.i18n) {
            this.i18n.switchLanguage(lang);
            this.updateAllDynamicContent();
        } else {
            console.error('i18n не доступен');
        }
    }

    updateAllDynamicContent() {
        // Обновляем все динамическое содержимое
        this.updateNotifications();
        this.updateModalContent();
        this.updateAIPanel();
    }

    updateNotifications() {
        // Обновляем текст уведомлений
        console.log('Обновление текста уведомлений');
    }

    updateModalContent() {
        // Обновляем модальные окна
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            this.showContestInfo(); // Пересоздаем с новым языком
        }
    }

    updateAIPanel() {
        // Обновляем панель AI
        const aiPanel = document.querySelector('.ai-panel');
        if (aiPanel) {
            this.showAIPanel(); // Пересоздаем с новым языком
        }
    }

    getPageKey(pageName) {
        const pages = {
            'главная': 'main',
            'башкы': 'main',
            '홈': 'main',
            'технологии': 'technologies',
            'технологиялар': 'technologies',
            '기술': 'technologies',
            'как работает': 'how-it-works',
            'кантип иштейт': 'how-it-works',
            '작동 원리': 'how-it-works',
            'демо': 'demo',
            'демо': 'demo',
            '데모': 'demo',
            'команда': 'team',
            'команда': 'team',
            '팀': 'team'
        };
        return pages[pageName] || 'main';
    }

    animateNavigation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    contactExpert() {
        console.log('📞 Связь с экспертом');
        
        const message = this.i18n ? this.i18n.getTranslation('notification.connecting') : 'Соединяем с экспертом...';
        this.showNotification(message, 'info');
        
        setTimeout(() => {
            const connectedMsg = this.i18n ? this.i18n.getTranslation('notification.connected') : 'Эксперт готов к общению!';
            this.showNotification(connectedMsg, 'success');
            this.openExpertChat();
        }, 1500);
    }

    showContestInfo() {
        console.log('🎯 Информация о конкурсе');
        
        if (!this.i18n) return;
        
        const modalContent = `
            <div class="modal-overlay" id="contestModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${this.i18n.getTranslation('modal.contest.title')}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p><strong>${this.i18n.getTranslation('contest.description')}</strong></p>
                        <ul>
                            <li>📅 ${this.i18n.getTranslation('modal.contest.dates')}</li>
                            <li>🏆 ${this.i18n.getTranslation('modal.contest.prize')}</li>
                            <li>🎯 ${this.i18n.getTranslation('modal.contest.goal')}</li>
                            <li>👥 ${this.i18n.getTranslation('modal.contest.participants')}</li>
                        </ul>
                        <div class="modal-actions">
                            <button class="modal-button primary" onclick="app.registerForContest()">
                                ${this.i18n.getTranslation('modal.contest.participate')}
                            </button>
                            <button class="modal-button secondary" onclick="app.closeModal()">
                                ${this.i18n.getTranslation('modal.contest.close')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalContent);
    }

    launchAI() {
        console.log('🚀 Запуск ИИ-платформы');
        
        const message = this.i18n ? this.i18n.getTranslation('notification.launching') : 'Запуск ИИ-платформы...';
        this.showNotification(message, 'info');
        
        const button = document.querySelector('.cta-button');
        const originalText = button.innerHTML;
        
        const loadingText = this.i18n ? 
            `<span class="nav-icon">⏳</span><span class="nav-text">${this.i18n.getTranslation('notification.launching')}</span>` :
            '<span class="nav-icon">⏳</span><span class="nav-text">Загрузка...</span>';
        
        button.innerHTML = loadingText;
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            
            const successMsg = this.i18n ? 
                this.i18n.getTranslation('notification.launched') : 
                'ИИ-платформа успешно запущена!';
            
            this.showNotification(successMsg, 'success');
            this.showAIPanel();
        }, 2000);
    }

    showAIPanel() {
        if (!this.i18n) return;
        
        const aiPanel = `
            <div class="ai-panel">
                <div class="ai-header">
                    <h4>${this.i18n.getTranslation('ai.panel.title')}</h4>
                    <button class="ai-close">&times;</button>
                </div>
                <div class="ai-status">
                    <div class="status-item">
                        <span class="status-label">${this.i18n.getTranslation('ai.status.data')}</span>
                        <span class="status-value active">${this.i18n.getTranslation('ai.status.active')}</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">${this.i18n.getTranslation('ai.status.harvest')}</span>
                        <span class="status-value active">${this.i18n.getTranslation('ai.status.working')}</span>
                    </div>
                    <div class="status-item">
                        <span class="status-label">${this.i18n.getTranslation('ai.status.diagnosis')}</span>
                        <span class="status-value">${this.i18n.getTranslation('ai.status.ready')}</span>
                    </div>
                </div>
                <div class="ai-controls">
                    <button class="ai-button" onclick="app.startAnalysis()">
                        ${this.i18n.getTranslation('ai.controls.analyze')}
                    </button>
                    <button class="ai-button secondary" onclick="app.generateReport()">
                        ${this.i18n.getTranslation('ai.controls.report')}
                    </button>
                </div>
            </div>
        `;
        
        // Удаляем старую панель если есть
        const oldPanel = document.querySelector('.ai-panel');
        if (oldPanel) oldPanel.remove();
        
        document.body.insertAdjacentHTML('beforeend', aiPanel);
        
        document.querySelector('.ai-close').addEventListener('click', () => {
            document.querySelector('.ai-panel').remove();
        });
    }

    startAnalysis() {
        console.log('📊 Начало анализа');
        const message = this.i18n ? 
            this.i18n.getTranslation('notification.analyzing') || 'Анализ данных запущен...' : 
            'Анализ данных запущен...';
        this.showNotification(message, 'info');
    }

    generateReport() {
        console.log('📈 Генерация отчёта');
        const message = this.i18n ? 
            this.i18n.getTranslation('notification.reporting') || 'Отчёт формируется...' : 
            'Отчёт формируется...';
        this.showNotification(message, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${this.getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            'info': 'ℹ️',
            'success': '✅',
            'warning': '⚠️',
            'error': '❌'
        };
        return icons[type] || 'ℹ️';
    }

    showModal(content) {
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) existingModal.remove();
        
        document.body.insertAdjacentHTML('beforeend', content);
        
        const modal = document.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
    }

    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
        }
    }

    registerForContest() {
        const message = this.i18n ? 
            this.i18n.getTranslation('notification.registered') : 
            'Регистрация на конкурс открыта!';
        
        this.showNotification(message, 'success');
        this.closeModal();
    }

    openExpertChat() {
        console.log('💬 Открытие чата с экспертом');
        
        // Создаем чат окно
        const chatWindow = `
            <div class="chat-modal">
                <div class="chat-header">
                    <h4>💬 ${this.i18n ? this.i18n.getTranslation('expert.name') : 'Анастасия "Вижн"'}</h4>
                    <button class="chat-close">&times;</button>
                </div>
                <div class="chat-body">
                    <div class="chat-messages">
                        <div class="message expert">
                            <div class="message-content">
                                ${this.i18n ? this.i18n.getTranslation('expert.greeting') || 'Здравствуйте! Чем могу помочь?' : 'Здравствуйте! Чем могу помочь?'}
                            </div>
                            <div class="message-time">${this.formatTime()}</div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="${this.i18n ? this.i18n.getTranslation('chat.placeholder') || 'Введите сообщение...' : 'Введите сообщение...'}" id="chatMessage">
                        <button onclick="app.sendMessage()">📤</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatWindow);
        
        document.querySelector('.chat-close').addEventListener('click', () => {
            document.querySelector('.chat-modal').remove();
        });
        
        // Фокус на поле ввода
        setTimeout(() => {
            document.getElementById('chatMessage').focus();
        }, 100);
    }

    sendMessage() {
        const input = document.getElementById('chatMessage');
        const message = input.value.trim();
        
        if (message) {
            // Добавляем сообщение пользователя
            const messagesContainer = document.querySelector('.chat-messages');
            const userMessage = `
                <div class="message user">
                    <div class="message-content">${message}</div>
                    <div class="message-time">${this.formatTime()}</div>
                </div>
            `;
            
            messagesContainer.insertAdjacentHTML('beforeend', userMessage);
            input.value = '';
            
            // Имитация ответа эксперта
            setTimeout(() => {
                const responses = this.i18n ? [
                    this.i18n.getTranslation('expert.response1') || 'Понимаю ваш вопрос. Могу порекомендовать...',
                    this.i18n.getTranslation('expert.response2') || 'Для решения этой проблемы рекомендуется...',
                    this.i18n.getTranslation('expert.response3') || 'Хороший вопрос! Давайте рассмотрим подробнее...'
                ] : [
                    'Понимаю ваш вопрос. Могу порекомендовать...',
                    'Для решения этой проблемы рекомендуется...',
                    'Хороший вопрос! Давайте рассмотрим подробнее...'
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                const expertMessage = `
                    <div class="message expert">
                        <div class="message-content">${randomResponse}</div>
                        <div class="message-time">${this.formatTime()}</div>
                    </div>
                `;
                
                messagesContainer.insertAdjacentHTML('beforeend', expertMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    }

    formatTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const sidebar = document.querySelector('.sidebar');
        
        if (scrollY > 100) {
            sidebar.classList.add('scrolled');
        } else {
            sidebar.classList.remove('scrolled');
        }
    }

    handleResize() {
        console.log('🔄 Размер окна изменен:', window.innerWidth);
        
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }

    initializeAnimations() {
        this.animateElements();
        this.setupParallax();
    }

    animateElements() {
        const elements = document.querySelectorAll('.tech-item, .expert-card, .contest-card, .team-member');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => observer.observe(element));
    }

    setupParallax() {
        // Простой параллакс эффект для фона
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const background = document.querySelector('body');
            if (background) {
                background.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

    loadUserPreferences() {
        const darkMode = localStorage.getItem('neodagro-dark-mode');
        if (darkMode === 'true') {
            this.toggleDarkMode();
        }
        
        // Загружаем предпочтения языка
        const savedLang = localStorage.getItem('neodagro_lang');
        if (savedLang && this.i18n) {
            this.i18n.switchLanguage(savedLang);
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        localStorage.setItem('neodagro-dark-mode', this.isDarkMode);
    }

    loadPageContent(page) {
        console.log(`Загрузка контента для: ${page}`);
        
        // Динамическая загрузка контента
        switch(page) {
            case 'technologies':
                this.loadTechnologies();
                break;
            case 'team':
                this.loadTeam();
                break;
            case 'demo':
                this.loadDemo();
                break;
        }
    }

    loadTechnologies() {
        // Динамическая загрузка технологий
        console.log('Загрузка подробностей о технологиях');
    }

    loadTeam() {
        // Динамическая загрузка информации о команде
        console.log('Загрузка подробностей о команде');
    }

    loadDemo() {
        // Динамическая загрузка демо
        console.log('Загрузка демо-версии');
    }

    updateNotificationsForLanguage() {
        // Обновляем системные уведомления при смене языка
        console.log('Обновление уведомлений для нового языка');
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NeoAgroApp();
    
    // Добавляем глобальные вспомогательные функции
    window.switchLanguage = (lang) => {
        if (window.i18n) {
            window.i18n.switchLanguage(lang);
        }
    };
    
    window.getCurrentLanguage = () => {
        return window.i18n ? window.i18n.getCurrentLanguage() : 'ru';
    };
});

// Вспомогательные функции
function formatDate(date = new Date()) {
    return date.toLocaleDateString(window.i18n ? window.i18n.getCurrentLanguage() : 'ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Добавляем CSS для чата
const chatStyles = `
<style>
    .chat-modal {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: slideUpChat 0.3s ease;
    }
    
    .chat-header {
        background: var(--primary);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .chat-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
    
    .chat-body {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    .chat-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }
    
    .message {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
    }
    
    .message.expert {
        align-items: flex-start;
    }
    
    .message.user {
        align-items: flex-end;
    }
    
    .message-content {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 18px;
        margin-bottom: 5px;
    }
    
    .message.expert .message-content {
        background: #f0f0f0;
        color: var(--text-dark);
    }
    
    .message.user .message-content {
        background: var(--primary);
        color: white;
    }
    
    .message-time {
        font-size: 11px;
        color: #999;
    }
    
    .chat-input {
        padding: 15px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
    }
    
    .chat-input input {
        flex: 1;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
        font-size: 14px;
    }
    
    .chat-input button {
        background: var(--primary);
        color: white;
        border: none;
        width: 45px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
    }
    
    @keyframes slideUpChat {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    /* Темная тема для чата */
    .dark-mode .chat-modal {
        background: #2c3e50;
        color: white;
    }
    
    .dark-mode .message.expert .message-content {
        background: #34495e;
        color: #ecf0f1;
    }
    
    .dark-mode .chat-input {
        border-top-color: #34495e;
    }
    
    .dark-mode .chat-input input {
        background: #34495e;
        border-color: #2c3e50;
        color: white;
    }
    
    /* Анимации */
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .message.user {
        animation: slideInRight 0.3s ease;
    }
    
    .message.expert {
        animation: slideInLeft 0.3s ease;
    }
    
    /* Языковые стили */
    .lang-ko {
        font-family: 'Noto Sans KR', 'Inter', sans-serif;
    }
    
    .lang-kg {
        letter-spacing: 0.5px;
    }
    
    /* Адаптивность чата */
    @media (max-width: 768px) {
        .chat-modal {
            width: calc(100% - 40px);
            height: 400px;
            right: 20px;
            left: 20px;
            bottom: 20px;
        }
    }
</style>
`;

// Добавляем стили чата в документ
document.head.insertAdjacentHTML('beforeend', chatStyles);

// Добавляем дополнительные переводы для чата
if (window.i18n) {
    // Русский
    window.i18n.addTranslation('ru', 'expert.greeting', 'Здравствуйте! Я Анастасия, эксперт по грибковым заболеваниям. Чем могу помочь?');
    window.i18n.addTranslation('ru', 'expert.response1', 'Для лечения грибковых заболеваний рекомендую использовать фунгицид на основе меди.');
    window.i18n.addTranslation('ru', 'expert.response2', 'Важно обеспечить хорошую вентиляцию и контролировать влажность.');
    window.i18n.addTranslation('ru', 'expert.response3', 'Могу порекомендовать профилактические меры для вашей культуры.');
    window.i18n.addTranslation('ru', 'chat.placeholder', 'Введите сообщение...');
    
    // Кыргызский
    window.i18n.addTranslation('kg', 'expert.greeting', 'Саламатсызбы! Мен Анастасия, козу карын оорулары боюнча эксперт. Эмне жардам бере алам?');
    window.i18n.addTranslation('kg', 'expert.response1', 'Козу карын ооруларын дарылоо үчүн жез негизиндеги фунгицид колдонууну сунуштайм.');
    window.i18n.addTranslation('kg', 'expert.response2', 'Жакшы аба алмашууну камсыз кылуу жана нымдуулукту көзөмөлдөө маанилүү.');
    window.i18n.addTranslation('kg', 'expert.response3', 'Сиздин өсүмдүк үчүн алдын алуу чараларын сунуштай алам.');
    window.i18n.addTranslation('kg', 'chat.placeholder', 'Кат жазыңыз...');
    
    // Корейский
    window.i18n.addTranslation('ko', 'expert.greeting', '안녕하세요! 저는 곰팡이 질병 전문가 아나스타샤입니다. 무엇을 도와드릴까요?');
    window.i18n.addTranslation('ko', 'expert.response1', '곰팡이 질병 치료를 위해 구리 기반 살균제 사용을 권장합니다.');
    window.i18n.addTranslation('ko', 'expert.response2', '적절한 통풍과 습도 관리가 중요합니다.');
    window.i18n.addTranslation('ko', 'expert.response3', '귀하의 작물에 대한 예방 조치를 추천해 드릴 수 있습니다.');
    window.i18n.addTranslation('ko', 'chat.placeholder', '메시지를 입력하세요...');
}