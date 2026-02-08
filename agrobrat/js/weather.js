// weather.js - Погода
class WeatherManager {
    constructor() {
        this.currentWeather = null;
        this.forecast = [];
        this.init();
    }
    
    init() {
        console.log('Инициализация погодного модуля...');
        this.initButtons();
        this.loadWeather(); // Загружаем погоду по умолчанию для Бишкека
    }
    
    initButtons() {
        // Поиск погоды
        const searchBtn = document.getElementById('search-weather');
        const locationInput = document.getElementById('weather-location');
        
        if (searchBtn && locationInput) {
            searchBtn.addEventListener('click', () => {
                const location = locationInput.value.trim();
                if (location) {
                    this.loadWeather(location);
                }
            });
            
            locationInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const location = locationInput.value.trim();
                    if (location) {
                        this.loadWeather(location);
                    }
                }
            });
        }
    }
    
    async loadWeather(location = 'Бишкек') {
        try {
            app.showNotification('Загрузка погоды...', 'info');
            
            // В реальном приложении здесь был бы API запрос
            // Для примера используем мок-данные
            
            // Мок-данные для разных городов
            const mockData = {
                'бишкек': {
                    city: 'Бишкек, Кыргызстан',
                    temp: 25,
                    description: 'Солнечно',
                    icon: 'fa-sun',
                    humidity: 65,
                    wind: 5,
                    pressure: 1013,
                    forecast: [
                        { day: 'Сегодня', temp: 25, icon: 'fa-sun' },
                        { day: 'Завтра', temp: 26, icon: 'fa-sun' },
                        { day: 'Ср', temp: 24, icon: 'fa-cloud-sun' },
                        { day: 'Чт', temp: 22, icon: 'fa-cloud' },
                        { day: 'Пт', temp: 21, icon: 'fa-cloud-rain' }
                    ]
                },
                'москва': {
                    city: 'Москва, Россия',
                    temp: 15,
                    description: 'Облачно',
                    icon: 'fa-cloud',
                    humidity: 75,
                    wind: 3,
                    pressure: 1015,
                    forecast: [
                        { day: 'Сегодня', temp: 15, icon: 'fa-cloud' },
                        { day: 'Завтра', temp: 14, icon: 'fa-cloud-rain' },
                        { day: 'Ср', temp: 16, icon: 'fa-cloud-sun' },
                        { day: 'Чт', temp: 17, icon: 'fa-sun' },
                        { day: 'Пт', temp: 18, icon: 'fa-sun' }
                    ]
                },
                'сеул': {
                    city: 'Сеул, Южная Корея',
                    temp: 20,
                    description: 'Ясно',
                    icon: 'fa-sun',
                    humidity: 60,
                    wind: 4,
                    pressure: 1012,
                    forecast: [
                        { day: 'Сегодня', temp: 20, icon: 'fa-sun' },
                        { day: 'Завтра', temp: 21, icon: 'fa-sun' },
                        { day: 'Ср', temp: 19, icon: 'fa-cloud-sun' },
                        { day: 'Чт', temp: 18, icon: 'fa-cloud' },
                        { day: 'Пт', temp: 17, icon: 'fa-cloud-rain' }
                    ]
                }
            };
            
            const cityKey = location.toLowerCase();
            const weatherData = mockData[cityKey] || mockData['бишкек'];
            
            // Обновление текущей погоды
            this.updateCurrentWeather(weatherData);
            
            // Обновление прогноза
            this.updateForecast(weatherData.forecast);
            
            app.showNotification(`Погода для ${weatherData.city} загружена`, 'success');
            
        } catch (error) {
            console.error('Ошибка загрузки погоды:', error);
            app.showNotification('Ошибка загрузки погоды', 'error');
        }
    }
    
    updateCurrentWeather(data) {
        document.getElementById('weather-city').textContent = data.city;
        document.getElementById('weather-temp').textContent = `${data.temp}°C`;
        document.getElementById('weather-description').textContent = data.description;
        document.getElementById('weather-icon').className = `fas ${data.icon}`;
        document.getElementById('humidity-level').textContent = `${data.humidity}%`;
        document.getElementById('wind-speed').textContent = `${data.wind} м/с`;
        document.getElementById('pressure-level').textContent = `${data.pressure} гПа`;
    }
    
    updateForecast(forecastData) {
        const forecastList = document.getElementById('weather-forecast');
        if (!forecastList) return;
        
        forecastList.innerHTML = '';
        
        forecastData.forEach(day => {
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            forecastDay.innerHTML = `
                <div class="day">${day.day}</div>
                <div class="forecast-icon">
                    <i class="fas ${day.icon}"></i>
                </div>
                <div class="temp">${day.temp}°C</div>
            `;
            forecastList.appendChild(forecastDay);
        });
    }
    
    getWeatherAdvice(weatherData) {
        const temp = weatherData.temp;
        const description = weatherData.description.toLowerCase();
        
        let advice = '';
        
        if (temp < 0) {
            advice = '❄️ **Холодная погода:**\n• Защитите растения от мороза\n• Утеплите теплицы\n• Обеспечьте животных теплым помещением\n• Проверьте системы отопления';
        } else if (temp < 10) {
            advice = '🥶 **Прохладная погода:**\n• Подождите с посадкой теплолюбивых культур\n• Защитите рассаду\n• Укройте грядки на ночь\n• Проверьте укрытия для растений';
        } else if (temp < 20) {
            advice = '🌤️ **Умеренная погода:**\n• Идеально для посадки большинства культур\n• Начинайте посев холодостойких растений\n• Проветривайте теплицы днем\n• Начинайте подготовку почвы';
        } else if (temp < 30) {
            advice = '☀️ **Теплая погода:**\n• Идеально для роста растений\n• Увеличьте полив\n• Защитите растения от прямого солнца\n• Начинайте посадку теплолюбивых культур';
        } else {
            advice = '🔥 **Жаркая погода:**\n• Увеличьте полив\n• Затеняйте растения в полдень\n• Проветривайте теплицы\n• Поливайте утром или вечером\n• Следите за влажностью почвы';
        }
        
        if (description.includes('дождь') || description.includes('rain')) {
            advice += '\n\n🌧️ **Дождливая погода:**\n• Отложите полив\n• Проверьте дренаж\n• Защитите растения от переувлажнения\n• Собирайте урожай до дождя';
        }
        
        if (description.includes('ветер') || description.includes('wind')) {
            advice += '\n\n💨 **Ветреная погода:**\n• Укрепите опоры для растений\n• Закройте теплицы\n• Защитите рассаду\n• Проверьте укрытия';
        }
        
        return advice;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.weatherManager = new WeatherManager();
});