import numpy as np
from PIL import Image
import json
import random
from typing import Dict, List
import base64
import io

class PlantDiseaseModel:
    """ИИ модель для анализа болезней растений"""
    
    def __init__(self):
        self.plant_types = {
            'tomato': 'Помидор',
            'potato': 'Картофель',
            'apple': 'Яблоня',
            'wheat': 'Пшеница',
            'corn': 'Кукуруза',
            'grape': 'Виноград'
        }
        
        self.diseases = {
            'tomato': ['Фитофтороз', 'Мучнистая роса', 'Серая гниль', 'Вертициллез', 'Бактериальный рак'],
            'potato': ['Фитофтороз', 'Парша', 'Черная ножка', 'Кольцевая гниль', 'Ризоктониоз'],
            'apple': ['Парша', 'Мучнистая роса', 'Черный рак', 'Цитоспороз', 'Монилиоз'],
            'wheat': ['Ржавчина', 'Мучнистая роса', 'Септориоз', 'Фузариоз', 'Гельминтоспориоз'],
            'corn': ['Пузырчатая головня', 'Нигроспороз', 'Фузариоз', 'Диплодиоз', 'Ржавчина'],
            'grape': ['Милдью', 'Оидиум', 'Серая гниль', 'Антракноз', 'Бактериальный рак']
        }
        
        self.treatments = {
            'Фитофтороз': 'Применить медьсодержащие препараты (бордосская смесь 1%). Обработка каждые 10-14 дней.',
            'Мучнистая роса': 'Серосодержащие препараты, улучшение вентиляции. Топаз, Скор.',
            'Серая гниль': 'Удаление пораженных частей. Фунгициды: Ровраль, Топсин-М.',
            'Вертициллез': 'Севооборот, устойчивые сорта. Фундазол, Беномил.',
            'Парша': 'Обработка весной мочевиной 7%. Бордосская смесь, Хорус.',
            'Ржавчина': 'Фунгициды: Байлетон, Топаз. Удаление пораженных листьев.',
            'Здоровое растение': 'Продолжайте правильный уход. Профилактические обработки.'
        }
        
        self.is_initialized = True
        
    def is_ready(self) -> bool:
        """Проверка готовности модели"""
        return self.is_initialized
    
    def preprocess_image(self, image_bytes: bytes) -> np.ndarray:
        """Предобработка изображения"""
        image = Image.open(io.BytesIO(image_bytes))
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        return image_array
    
    def predict_disease(self, image_bytes: bytes, plant_type: str = 'tomato') -> Dict:
        """Предсказание болезни растения"""
        try:
            # Имитация обработки ИИ
            processed_image = self.preprocess_image(image_bytes)
            
            # Генерация "предсказания" для демо
            possible_diseases = self.diseases.get(plant_type, ['Здоровое растение'])
            predicted_disease = random.choice(possible_diseases)
            
            # Генерация уверенности
            confidence = round(random.uniform(0.75, 0.98), 2)
            
            # Создание heatmap для визуализации (демо)
            heatmap = self._generate_heatmap(224, 224)
            
            return {
                "success": True,
                "plant_type": self.plant_types.get(plant_type, plant_type),
                "disease": predicted_disease,
                "confidence": confidence,
                "treatment": self.treatments.get(predicted_disease, "Консультация специалиста"),
                "prevention": self._get_prevention(predicted_disease),
                "heatmap": heatmap,
                "severity": random.choice(["Низкая", "Средняя", "Высокая"]),
                "affected_area": f"{random.randint(5, 80)}%"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def predict_yield(self, crop: str, area: float, region: str = None) -> Dict:
        """Прогноз урожайности"""
        # Базовая урожайность (т/га)
        base_yields = {
            'wheat': 3.5, 'tomato': 25.0, 'potato': 18.0,
            'corn': 6.0, 'apple': 15.0, 'grape': 10.0
        }
        
        base = base_yields.get(crop, 5.0)
        
        # Влияние региона
        region_factors = {
            'Чуйская область': 1.1,
            'Иссык-Кульская область': 0.9,
            'Ошская область': 1.2,
            'Нарынская область': 0.8
        }
        
        factor = region_factors.get(region, 1.0) * (0.85 + random.random() * 0.3)
        predicted_yield = round(base * area * factor, 2)
        
        return {
            "crop": self.plant_types.get(crop, crop),
            "area_hectares": area,
            "region": region or "Не указан",
            "predicted_yield_tons": predicted_yield,
            "confidence": round(0.7 + random.random() * 0.25, 2),
            "recommendations": self._get_yield_recommendations(crop, predicted_yield / area)
        }
    
    def _generate_heatmap(self, width: int, height: int) -> str:
        """Генерация демо heatmap"""
        # Создаем простую heatmap для визуализации
        heatmap_data = []
        for y in range(height // 10):
            row = []
            for x in range(width // 10):
                # Случайные значения для демо
                value = random.randint(30, 100)
                row.append(value)
            heatmap_data.append(row)
        
        # Конвертируем в base64 для простоты
        import json
        return base64.b64encode(json.dumps(heatmap_data).encode()).decode()
    
    def _get_prevention(self, disease: str) -> List[str]:
        """Получение мер профилактики"""
        preventions = {
            'Фитофтороз': [
                'Использование устойчивых сортов',
                'Соблюдение севооборота',
                'Оптимальная густота посадки',
                'Своевременное удаление пораженных растений'
            ],
            'Мучнистая роса': [
                'Контроль влажности',
                'Хорошая циркуляция воздуха',
                'Регулярная обрезка',
                'Профилактические обработки серой'
            ],
            'Серая гниль': [
                'Избегание переувлажнения',
                'Своевременный сбор урожая',
                'Дезинфекция инструментов',
                'Умеренное азотное питание'
            ]
        }
        
        return preventions.get(disease, [
            'Соблюдение агротехники',
            'Регулярный осмотр растений',
            'Профилактические обработки',
            'Баланс питательных веществ'
        ])
    
    def _get_yield_recommendations(self, crop: str, yield_per_ha: float) -> List[str]:
        """Рекомендации по увеличению урожайности"""
        recommendations = []
        
        if yield_per_ha < 5:
            recommendations.append("Увеличьте норму внесения удобрений на 30%")
            recommendations.append("Обеспечьте регулярный полив")
        elif yield_per_ha < 10:
            recommendations.append("Проведите листовую подкормку микроэлементами")
            recommendations.append("Оптимизируйте схему посадки")
        else:
            recommendations.append("Поддерживайте текущую агротехнику")
            recommendations.append("Проводите регулярный мониторинг почвы")
        
        recommendations.append("Используйте сорта, адаптированные к региону")
        recommendations.append("Соблюдайте севооборот")
        
        return recommendations
