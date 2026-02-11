export const CROP_TYPES = [
  { id: 1, name: 'Пшеница', color: 'bg-amber-500', icon: '🌾' },
  { id: 2, name: 'Кукуруза', color: 'bg-yellow-500', icon: '🌽' },
  { id: 3, name: 'Соя', color: 'bg-green-500', icon: '🥜' },
  { id: 4, name: 'Подсолнечник', color: 'bg-yellow-400', icon: '🌻' },
  { id: 5, name: 'Картофель', color: 'bg-purple-500', icon: '🥔' },
  { id: 6, name: 'Овощи', color: 'bg-red-500', icon: '🥦' },
  { id: 7, name: 'Фрукты', color: 'bg-pink-500', icon: '🍎' },
];

export const FIELD_STATUSES = [
  { id: 'preparation', name: 'Подготовка', color: 'bg-gray-400' },
  { id: 'sowing', name: 'Посев', color: 'bg-blue-400' },
  { id: 'growing', name: 'Рост', color: 'bg-green-400' },
  { id: 'harvesting', name: 'Сбор урожая', color: 'bg-yellow-400' },
  { id: 'fallow', name: 'Отдых', color: 'bg-brown-400' },
];

export const WEATHER_CONDITIONS = {
  1000: { text: 'Ясно', icon: '☀️', bgColor: 'bg-blue-100' },
  1003: { text: 'Переменная облачность', icon: '⛅', bgColor: 'bg-blue-50' },
  1006: { text: 'Облачно', icon: '☁️', bgColor: 'bg-gray-100' },
  1009: { text: 'Пасмурно', icon: '☁️', bgColor: 'bg-gray-200' },
  1030: { text: 'Туман', icon: '🌫️', bgColor: 'bg-gray-100' },
  1063: { text: 'Возможен дождь', icon: '🌦️', bgColor: 'bg-blue-100' },
  1066: { text: 'Возможен снег', icon: '🌨️', bgColor: 'bg-blue-50' },
  1069: { text: 'Мокрый снег', icon: '🌧️❄️', bgColor: 'bg-blue-50' },
  1072: { text: 'Ледяной дождь', icon: '🌧️🧊', bgColor: 'bg-blue-50' },
  1087: { text: 'Гроза', icon: '⛈️', bgColor: 'bg-purple-100' },
  1114: { text: 'Метель', icon: '❄️💨', bgColor: 'bg-blue-100' },
  1117: { text: 'Вьюга', icon: '🌬️❄️', bgColor: 'bg-blue-100' },
  1135: { text: 'Туман', icon: '🌫️', bgColor: 'bg-gray-100' },
  1147: { text: 'Холодный туман', icon: '🥶🌫️', bgColor: 'bg-blue-50' },
  1150: { text: 'Морось', icon: '🌧️', bgColor: 'bg-blue-100' },
  1153: { text: 'Легкий дождь', icon: '🌦️', bgColor: 'bg-blue-100' },
  1168: { text: 'Ледяной дождь', icon: '🌧️🧊', bgColor: 'bg-blue-50' },
  1171: { text: 'Сильный ледяной дождь', icon: '🌧️🧊💧', bgColor: 'bg-blue-50' },
  1180: { text: 'Небольшой дождь', icon: '🌧️', bgColor: 'bg-blue-100' },
  1183: { text: 'Умеренный дождь', icon: '🌧️', bgColor: 'bg-blue-200' },
  1186: { text: 'Сильный дождь', icon: '🌧️💧', bgColor: 'bg-blue-300' },
  1189: { text: 'Ливень', icon: '🌧️💦', bgColor: 'bg-blue-400' },
  1192: { text: 'Сильный ливень', icon: '🌧️💦💧', bgColor: 'bg-blue-500' },
  1195: { text: 'Проливной дождь', icon: '🌧️💦💦', bgColor: 'bg-blue-600' },
  1198: { text: 'Ледяной дождь', icon: '🌧️🧊', bgColor: 'bg-blue-50' },
  1201: { text: 'Умеренный ледяной дождь', icon: '🌧️🧊💧', bgColor: 'bg-blue-100' },
  1204: { text: 'Снег с дождем', icon: '🌨️', bgColor: 'bg-blue-100' },
  1207: { text: 'Сильный снег с дождем', icon: '🌨️💧', bgColor: 'bg-blue-200' },
  1210: { text: 'Небольшой снег', icon: '❄️', bgColor: 'bg-blue-50' },
  1213: { text: 'Умеренный снег', icon: '❄️❄️', bgColor: 'bg-blue-100' },
  1216: { text: 'Сильный снег', icon: '❄️❄️❄️', bgColor: 'bg-blue-200' },
  1219: { text: 'Метель', icon: '🌨️💨', bgColor: 'bg-blue-300' },
  1222: { text: 'Сильная метель', icon: '🌨️💨💨', bgColor: 'bg-blue-400' },
  1225: { text: 'Ледяной дождь', icon: '🌧️🧊', bgColor: 'bg-blue-50' },
  1237: { text: 'Град', icon: '🌨️🧊', bgColor: 'bg-blue-100' },
  1240: { text: 'Легкий дождь', icon: '🌧️', bgColor: 'bg-blue-100' },
  1243: { text: 'Умеренный дождь', icon: '🌧️', bgColor: 'bg-blue-200' },
  1246: { text: 'Сильный дождь', icon: '🌧️💧', bgColor: 'bg-blue-300' },
  1249: { text: 'Легкий снег', icon: '❄️', bgColor: 'bg-blue-50' },
  1252: { text: 'Умеренный снег', icon: '❄️❄️', bgColor: 'bg-blue-100' },
  1255: { text: 'Сильный снег', icon: '❄️❄️❄️', bgColor: 'bg-blue-200' },
  1258: { text: 'Град', icon: '🌨️🧊', bgColor: 'bg-blue-100' },
  1261: { text: 'Ледяной дождь', icon: '🌧️🧊', bgColor: 'bg-blue-50' },
  1264: { text: 'Сильный ледяной дождь', icon: '🌧️🧊💧', bgColor: 'bg-blue-100' },
  1273: { text: 'Гроза с дождем', icon: '⛈️', bgColor: 'bg-purple-100' },
  1276: { text: 'Сильная гроза с дождем', icon: '⛈️💧', bgColor: 'bg-purple-200' },
  1279: { text: 'Гроза со снегом', icon: '⛈️❄️', bgColor: 'bg-purple-100' },
  1282: { text: 'Сильная гроза со снегом', icon: '⛈️❄️💧', bgColor: 'bg-purple-200' },
};

export const DIARY_CATEGORIES = [
  { id: 'work', name: 'Работы', color: 'bg-blue-500', icon: '👨‍🌾' },
  { id: 'observation', name: 'Наблюдения', color: 'bg-green-500', icon: '👁️' },
  { id: 'problem', name: 'Проблемы', color: 'bg-red-500', icon: '⚠️' },
  { id: 'harvest', name: 'Урожай', color: 'bg-yellow-500', icon: '📊' },
  { id: 'expense', name: 'Расходы', color: 'bg-purple-500', icon: '💰' },
];

export const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];