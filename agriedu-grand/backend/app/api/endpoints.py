from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, StreamingResponse
from typing import List, Optional
import json
import asyncio
from datetime import datetime

from app.ml.plant_disease import PlantDiseaseModel

router = APIRouter()
plant_model = PlantDiseaseModel()

# Образовательные данные
EDUCATION_LESSONS = {
    "agriculture": [
        {
            "id": 1,
            "title": "Основы современного растениеводства",
            "description": "Введение в современные методы выращивания сельскохозяйственных культур",
            "duration": "45 минут",
            "level": "Начинающий",
            "topics": ["Почвоведение", "Семеноводство", "Ирригация", "Защита растений"],
            "video_url": "https://example.com/video1"
        },
        {
            "id": 2,
            "title": "Биологические методы защиты растений",
            "description": "Использование энтомофагов и биопрепаратов в сельском хозяйстве",
            "duration": "60 минут",
            "level": "Продвинутый",
            "topics": ["Энтомофаги", "Биопрепараты", "Севоборот", "Агротехнические методы"],
            "video_url": "https://example.com/video2"
        }
    ],
    "ai_technology": [
        {
            "id": 3,
            "title": "ИИ в точном земледелии",
            "description": "Применение искусственного интеллекта для оптимизации сельского хозяйства",
            "duration": "50 минут",
            "level": "Средний",
            "topics": ["Анализ спутниковых снимков", "Прогнозирование урожая", "Автоматизация"],
            "video_url": "https://example.com/video3"
        }
    ]
}

# Эндпоинты API
@router.post("/analyze-plant")
async def analyze_plant(
    image: UploadFile = File(..., description="Фото растения для анализа"),
    plant_type: str = Form("tomato", description="Тип растения"),
    location: Optional[str] = Form(None, description="Местоположение")
):
    """Анализ болезни растения по фотографии"""
    try:
        image_bytes = await image.read()
        
        if len(image_bytes) > 10 * 1024 * 1024:  # 10MB limit
            raise HTTPException(status_code=400, detail="Файл слишком большой")
        
        result = plant_model.predict_disease(image_bytes, plant_type)
        
        if location:
            result["location"] = location
            result["regional_advice"] = get_regional_advice(location, plant_type)
        
        # Добавляем timestamp
        result["analysis_id"] = f"ANALYSIS_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        result["timestamp"] = datetime.now().isoformat()
        
        return JSONResponse(content=result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка анализа: {str(e)}")

@router.get("/predict-yield")
async def predict_yield(
    crop: str,
    area: float,
    region: Optional[str] = None,
    soil_type: Optional[str] = None
):
    """Прогноз урожайности сельскохозяйственных культур"""
    try:
        if area <= 0:
            raise HTTPException(status_code=400, detail="Площадь должна быть положительной")
        
        result = plant_model.predict_yield(crop, area, region)
        
        if soil_type:
            result["soil_type"] = soil_type
            result["soil_recommendations"] = get_soil_recommendations(soil_type, crop)
        
        result["prediction_id"] = f"YIELD_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        return JSONResponse(content=result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка прогноза: {str(e)}")

@router.get("/lessons")
async def get_lessons(
    category: Optional[str] = "agriculture",
    level: Optional[str] = None,
    limit: Optional[int] = 10
):
    """Получение образовательных материалов"""
    try:
        lessons = EDUCATION_LESSONS.get(category, [])
        
        if level:
            lessons = [lesson for lesson in lessons if lesson["level"] == level]
        
        if limit:
            lessons = lessons[:limit]
        
        return {
            "category": category,
            "count": len(lessons),
            "lessons": lessons
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка получения уроков: {str(e)}")

@router.get("/dashboard/stats")
async def get_dashboard_stats():
    """Статистика для дашборда"""
    return {
        "total_analyses": 1250,
        "successful_predictions": 1187,
        "accuracy_rate": 95.0,
        "total_farmers": 347,
        "active_courses": 15,
        "avg_yield_increase": "23.5%",
        "last_updated": datetime.now().isoformat()
    }

@router.post("/train-model")
async def train_model(background_tasks: BackgroundTasks):
    """Запуск обучения модели (асинхронно)"""
    
    async def train_task():
        """Фоновая задача обучения"""
        await asyncio.sleep(5)  # Имитация обучения
        # Здесь будет реальное обучение модели
    
    background_tasks.add_task(train_task)
    
    return {
        "status": "training_started",
        "message": "Модель начала обучение в фоновом режиме",
        "estimated_time": "5-10 минут",
        "training_id": f"TRAIN_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    }

@router.get("/regions")
async def get_regions():
    """Получение списка регионов"""
    return {
        "regions": [
            {"id": "chuy", "name": "Чуйская область", "climate": "Умеренно-континентальный"},
            {"id": "issyk_kul", "name": "Иссык-Кульская область", "climate": "Горный"},
            {"id": "osh", "name": "Ошская область", "climate": "Континентальный"},
            {"id": "naryn", "name": "Нарынская область", "climate": "Резко континентальный"},
            {"id": "talas", "name": "Таласская область", "climate": "Умеренный"},
            {"id": "batken", "name": "Баткенская область", "climate": "Континентальный"},
            {"id": "jalal_abad", "name": "Джалал-Абадская область", "climate": "Субтропический"}
        ]
    }

# Вспомогательные функции
def get_regional_advice(region: str, plant_type: str) -> List[str]:
    """Советы по регионам"""
    advice_map = {
        "Чуйская область": [
            "Рекомендуется ранний посев из-за жаркого лета",
            "Используйте засухоустойчивые сорта",
            "Оптимальный полив - капельное орошение"
        ],
        "Иссык-Кульская область": [
            "Учитывайте высокогорный климат",
            "Используйте морозоустойчивые сорта",
            "Защита от ветра обязательна"
        ],
        "Ошская область": [
            "Благоприятные условия для теплолюбивых культур",
            "Длинный вегетационный период",
            "Возможно получение двух урожаев в год"
        ]
    }
    
    return advice_map.get(region, ["Соблюдайте общие рекомендации для вашего региона"])

def get_soil_recommendations(soil_type: str, crop: str) -> List[str]:
    """Рекомендации по типу почвы"""
    recommendations = {
        "чернозем": ["Богатая почва, умеренное удобрение", "Глубокая вспашка"],
        "суглинок": ["Добавление органических удобрений", "Регулярное рыхление"],
        "песчаная": ["Частый полив", "Внесение глины и органики", "Мульчирование"],
        "глинистая": ["Дренаж обязателен", "Внесение песка", "Известкование"]
    }
    
    return recommendations.get(soil_type, ["Проведите анализ почвы для точных рекомендаций"])
