import axiosInstance from '../api/axiosConfig';

// Для демо используем моковые данные
// В реальном приложении здесь был бы вызов к WeatherAPI, OpenWeatherMap и т.д.

export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          location: {
            name: "Москва",
            region: "Московская область",
            country: "Россия",
            lat,
            lon,
            tz_id: "Europe/Moscow",
            localtime: new Date().toISOString()
          },
          current: {
            last_updated: new Date().toISOString(),
            temp_c: 18,
            temp_f: 64.4,
            is_day: 1,
            condition: {
              text: "Частично облачно",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
              code: 1003
            },
            wind_kph: 12,
            wind_degree: 320,
            wind_dir: "СЗ",
            pressure_mb: 1013,
            pressure_in: 29.92,
            precip_mm: 0,
            precip_in: 0,
            humidity: 65,
            cloud: 40,
            feelslike_c: 18,
            feelslike_f: 64.4,
            vis_km: 10,
            vis_miles: 6,
            uv: 4,
            gust_kph: 18
          }
        };
        
        resolve({ data: mockData });
      }, 300);
    });
  },

  getForecast: async (lat, lon, days = 3) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const forecastday = Array.from({ length: days }, (_, i) => ({
          date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
          date_epoch: Math.floor((Date.now() + i * 86400000) / 1000),
          day: {
            maxtemp_c: 18 + Math.sin(i) * 3,
            mintemp_c: 12 + Math.cos(i) * 2,
            avgtemp_c: 15 + Math.sin(i) * 2.5,
            maxwind_kph: 10 + Math.random() * 10,
            totalprecip_mm: Math.random() * 5,
            totalsnow_cm: 0,
            avgvis_km: 10,
            avghumidity: 60 + Math.random() * 20,
            daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
            daily_chance_of_rain: Math.floor(Math.random() * 40),
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: ['Солнечно', 'Переменная облачность', 'Облачно', 'Небольшой дождь'][i % 4],
              icon: [
                "//cdn.weatherapi.com/weather/64x64/day/113.png",
                "//cdn.weatherapi.com/weather/64x64/day/116.png",
                "//cdn.weatherapi.com/weather/64x64/day/119.png",
                "//cdn.weatherapi.com/weather/64x64/day/296.png"
              ][i % 4],
              code: [1000, 1003, 1006, 1180][i % 4]
            },
            uv: 3 + Math.floor(Math.random() * 4)
          },
          astro: {
            sunrise: "06:30 AM",
            sunset: "08:45 PM",
            moonrise: "02:15 PM",
            moonset: "03:45 AM",
            moon_phase: "Растущая луна",
            moon_illumination: "45"
          },
          hour: Array.from({ length: 24 }, (_, h) => ({
            time_epoch: Math.floor((Date.now() + i * 86400000 + h * 3600000) / 1000),
            time: `${h.toString().padStart(2, '0')}:00`,
            temp_c: 12 + Math.sin(h / 24 * Math.PI) * 8,
            temp_f: 53.6 + Math.sin(h / 24 * Math.PI) * 14.4,
            is_day: h > 6 && h < 20 ? 1 : 0,
            condition: {
              text: h > 6 && h < 20 ? 'Солнечно' : 'Ясно',
              icon: h > 6 && h < 20 
                ? "//cdn.weatherapi.com/weather/64x64/day/113.png"
                : "//cdn.weatherapi.com/weather/64x64/night/113.png",
              code: 1000
            },
            wind_kph: 8 + Math.random() * 10,
            wind_degree: 270 + Math.random() * 180,
            wind_dir: ["С", "СЗ", "З", "ЮЗ", "Ю"][Math.floor(Math.random() * 5)],
            pressure_mb: 1010 + Math.random() * 10,
            pressure_in: 29.8 + Math.random() * 0.3,
            precip_mm: Math.random() > 0.8 ? Math.random() * 2 : 0,
            precip_in: 0,
            humidity: 50 + Math.random() * 30,
            cloud: Math.random() * 40,
            feelslike_c: 12 + Math.sin(h / 24 * Math.PI) * 8,
            feelslike_f: 53.6 + Math.sin(h / 24 * Math.PI) * 14.4,
            windchill_c: 12 + Math.sin(h / 24 * Math.PI) * 7,
            windchill_f: 53.6 + Math.sin(h / 24 * Math.PI) * 12.6,
            heatindex_c: 13 + Math.sin(h / 24 * Math.PI) * 7,
            heatindex_f: 55.4 + Math.sin(h / 24 * Math.PI) * 12.6,
            dewpoint_c: 5 + Math.random() * 5,
            dewpoint_f: 41 + Math.random() * 9,
            will_it_rain: Math.random() > 0.9 ? 1 : 0,
            chance_of_rain: Math.random() > 0.9 ? 30 : 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10,
            vis_miles: 6,
            gust_kph: 15 + Math.random() * 15,
            uv: h > 10 && h < 16 ? 5 + Math.random() * 3 : 1 + Math.random() * 2
          }))
        }));

        resolve({
          data: {
            location: {
              name: "Москва",
              region: "Московская область",
              country: "Россия",
              lat,
              lon
            },
            current: {
              temp_c: 18,
              condition: { text: "Частично облачно", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" }
            },
            forecast: { forecastday }
          }
        });
      }, 500);
    });
  },

  getHistory: async (lat, lon, date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            forecast: {
              forecastday: [{
                date,
                day: {
                  maxtemp_c: 20,
                  mintemp_c: 12,
                  avgtemp_c: 16,
                  totalprecip_mm: 2.3,
                  condition: {
                    text: "Небольшой дождь",
                    icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
                  }
                }
              }]
            }
          }
        });
      }, 300);
    });
  }
};