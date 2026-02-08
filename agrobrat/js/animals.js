// animals.js - Управление животными
class AnimalManager {
    constructor() {
        this.animals = [];
        this.currentAnimalId = null;
        this.init();
    }
    
    init() {
        console.log('Инициализация управления животными...');
        this.loadAnimals();
        this.initButtons();
    }
    
    loadAnimals() {
        try {
            const saved = localStorage.getItem('animals');
            this.animals = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Ошибка загрузки животных:', error);
            this.animals = [];
        }
    }
    
    saveAnimals() {
        try {
            localStorage.setItem('animals', JSON.stringify(this.animals));
            if (typeof app !== 'undefined') {
                app.updateStats();
            }
        } catch (error) {
            console.error('Ошибка сохранения животных:', error);
        }
    }
    
    initButtons() {
        // Добавление животного
        const addAnimalBtn = document.getElementById('add-animal');
        const quickAddAnimalBtn = document.getElementById('quick-add-animal');
        
        if (addAnimalBtn) {
            addAnimalBtn.addEventListener('click', () => {
                this.showAddAnimalModal();
            });
        }
        
        if (quickAddAnimalBtn) {
            quickAddAnimalBtn.addEventListener('click', () => {
                this.showAddAnimalModal();
            });
        }
    }
    
    showAddAnimalModal() {
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('animals.addButton')}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Тип животного</label>
                            <select id="animal-type" class="form-input">
                                <option value="cow">Корова</option>
                                <option value="pig">Свинья</option>
                                <option value="sheep">Овца</option>
                                <option value="goat">Коза</option>
                                <option value="chicken">Курица</option>
                                <option value="duck">Утка</option>
                                <option value="goose">Гусь</option>
                                <option value="turkey">Индейка</option>
                                <option value="rabbit">Кролик</option>
                                <option value="horse">Лошадь</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" id="animal-count" class="form-input" value="1" min="1">
                        </div>
                        <div class="form-group">
                            <label>Название/Описание</label>
                            <input type="text" id="animal-name" class="form-input" placeholder="Например: Стадо коров, Куры-несушки и т.д.">
                        </div>
                        <div class="form-group">
                            <label>Примечания</label>
                            <textarea id="animal-notes" class="form-input" rows="3" placeholder="Порода, возраст, особенности..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-save-animal">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        document.getElementById('modal-save-animal').addEventListener('click', () => {
            this.saveAnimal();
        });
    }
    
    saveAnimal() {
        const type = document.getElementById('animal-type').value;
        const count = parseInt(document.getElementById('animal-count').value) || 1;
        const name = document.getElementById('animal-name').value.trim();
        const notes = document.getElementById('animal-notes').value.trim();
        
        if (!name) {
            app.showNotification('Введите название/описание', 'error');
            return;
        }
        
        const newAnimal = {
            id: app.generateId(),
            type: type,
            count: count,
            name: name,
            notes: notes,
            expenses: [],
            income: [],
            notesList: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.animals.push(newAnimal);
        this.saveAnimals();
        app.closeModal();
        this.loadAnimalsList();
        
        app.showNotification('Животные успешно добавлены', 'success');
    }
    
    loadAnimalsList() {
        const animalsList = document.getElementById('animals-list');
        if (!animalsList) return;
        
        animalsList.innerHTML = '';
        
        if (this.animals.length === 0) {
            animalsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-cow"></i>
                    <h3>${i18n.getTranslation('home.animals')}</h3>
                    <p>${i18n.getTranslation('home.noActivity')}</p>
                    <button class="btn btn-primary" id="add-first-animal">
                        <i class="fas fa-plus"></i>
                        ${i18n.getTranslation('animals.addButton')}
                    </button>
                </div>
            `;
            
            document.getElementById('add-first-animal').addEventListener('click', () => {
                this.showAddAnimalModal();
            });
            
            return;
        }
        
        this.animals.forEach(animal => {
            const animalCard = document.createElement('div');
            animalCard.className = 'animal-card';
            
            const animalIcons = {
                'cow': 'fa-cow',
                'pig': 'fa-piggy-bank',
                'sheep': 'fa-sheep',
                'goat': 'fa-goat',
                'chicken': 'fa-kiwi-bird',
                'duck': 'fa-feather',
                'goose': 'fa-feather-alt',
                'turkey': 'fa-dove',
                'rabbit': 'fa-paw',
                'horse': 'fa-horse',
                'other': 'fa-paw'
            };
            
            const icon = animalIcons[animal.type] || 'fa-paw';
            
            animalCard.innerHTML = `
                <div class="card-header">
                    <h3>${animal.name}</h3>
                    <span class="animal-type">
                        <i class="fas ${icon}"></i>
                        ${this.getAnimalTypeName(animal.type)}
                    </span>
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-hashtag"></i>
                        <span>${animal.count} голов</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${animal.expenses.length} расходов</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-coins"></i>
                        <span>${animal.income.length} доходов</span>
                    </div>
                </div>
                ${animal.notes ? `<p class="animal-notes">${animal.notes}</p>` : ''}
                <div class="card-actions">
                    <button class="btn btn-primary btn-view" data-id="${animal.id}">
                        <i class="fas fa-eye"></i>
                        ${i18n.getTranslation('common.view')}
                    </button>
                    <button class="btn btn-secondary btn-edit" data-id="${animal.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-delete" data-id="${animal.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            animalsList.appendChild(animalCard);
        });
        
        // Добавление обработчиков
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const animalId = e.currentTarget.dataset.id;
                // В будущем можно добавить детальную страницу
                app.showNotification('Детальная страница в разработке', 'info');
            });
        });
        
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const animalId = e.currentTarget.dataset.id;
                // В будущем можно добавить редактирование
                app.showNotification('Редактирование в разработке', 'info');
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const animalId = e.currentTarget.dataset.id;
                this.deleteAnimal(animalId);
            });
        });
    }
    
    getAnimalTypeName(typeCode) {
        const types = {
            'cow': 'Корова',
            'pig': 'Свинья',
            'sheep': 'Овца',
            'goat': 'Коза',
            'chicken': 'Курица',
            'duck': 'Утка',
            'goose': 'Гусь',
            'turkey': 'Индейка',
            'rabbit': 'Кролик',
            'horse': 'Лошадь',
            'other': 'Другое'
        };
        return types[typeCode] || 'Неизвестно';
    }
    
    deleteAnimal(animalId) {
        const animal = this.animals.find(a => a.id === animalId);
        if (!animal) return;
        
        const confirmMessage = `Удалить "${animal.name}"?`;
        
        if (!confirm(confirmMessage)) return;
        
        this.animals = this.animals.filter(a => a.id !== animalId);
        this.saveAnimals();
        this.loadAnimalsList();
        
        app.showNotification('Животные удалены', 'success');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.animalManager = new AnimalManager();
});