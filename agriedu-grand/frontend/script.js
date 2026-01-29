// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Обновление даты и времени
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('current-date').textContent = 
            now.toLocaleDateString('ru-RU', options);
    }
    
    // Проверка статуса backend
    async function checkBackendStatus() {
        try {
            const response = await fetch('http://localhost:8000/api/health', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const statusElement = document.getElementById('backend-status');
                statusElement.innerHTML = 
                    <span style="color: #4CAF50">●</span>  
                    <small>()</small>
                ;
                
                // Обновляем время работы
                if (data.timestamp) {
                    const uptime = new Date(data.timestamp);
                    const diff = Math.floor((new Date() - uptime) / 1000);
                    const hours = Math.floor(diff / 3600);
                    const minutes = Math.floor((diff % 3600) / 60);
                    document.getElementById('uptime').textContent = 
                        ${hours}ч м;
                }
                
                return true;
            }
        } catch (error) {
            console.error('Ошибка подключения к backend:', error);
            document.getElementById('backend-status').innerHTML = 
                '<span style="color: #f44336">●</span> ОФЛАЙН';
            return false;
        }
    }
    
    // Анимация карточек при прокрутке
    function animateOnScroll() {
        const cards = document.querySelectorAll('.feature-card, .status-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Имитация пользователей онлайн
    function updateUserCount() {
        const baseUsers = 12;
        const randomChange = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const currentUsers = Math.max(1, baseUsers + randomChange);
        document.getElementById('user-count').textContent = 
            ${currentUsers} активных;
    }
    
    // Инициализация
    updateDateTime();
    checkBackendStatus();
    updateUserCount();
    
    // Установка интервалов
    setInterval(updateDateTime, 1000);
    setInterval(checkBackendStatus, 30000); // Каждые 30 секунд
    setInterval(updateUserCount, 15000); // Каждые 15 секунд
    
    // Обработчик прокрутки
    window.addEventListener('scroll', animateOnScroll);
    
    // Первоначальная анимация
    setTimeout(animateOnScroll, 100);
    
    // Добавляем эффект наведения на кнопки
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Консольное сообщение
    console.log('%c🌱 AgriEdu AI Suite v2.0', 'color: #4CAF50; font-size: 18px; font-weight: bold;');
    console.log('%cСистема успешно загружена!', 'color: #2196F3;');
});
