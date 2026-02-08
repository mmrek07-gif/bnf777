// greenhouses.js - Управление теплицами
class GreenhouseManager {
    constructor() {
        this.greenhouses = [];
        this.currentGreenhouseId = null;
        this.init();
    }
    
    init() {
        console.log('Инициализация управления теплицами...');
        this.loadGreenhouses();
        this.initButtons();
    }
    
    loadGreenhouses() {
        try {
            const saved = localStorage.getItem('greenhouses');
            this.greenhouses = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Ошибка загрузки теплиц:', error);
            this.greenhouses = [];
        }
    }
    
    saveGreenhouses() {
        try {
            localStorage.setItem('greenhouses', JSON.stringify(this.greenhouses));
            if (typeof app !== 'undefined') {
                app.updateStats();
            }
        } catch (error) {
            console.error('Ошибка сохранения теплиц:', error);
        }
    }
    
    initButtons() {
        // Добавление теплицы
        const addGreenhouseBtn = document.getElementById('add-greenhouse');
        const quickAddGreenhouseBtn = document.getElementById('quick-add-greenhouse');
        
        if (addGreenhouseBtn) {
            addGreenhouseBtn.addEventListener('click', () => {
                this.showAddGreenhouseModal();
            });
        }
        
        if (quickAddGreenhouseBtn) {
            quickAddGreenhouseBtn.addEventListener('click', () => {
                this.showAddGreenhouseModal();
            });
        }
    }
    
    showAddGreenhouseModal() {
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('greenhouses.addButton')}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Название теплицы</label>
                            <input type="text" id="greenhouse-name" class="form-input" placeholder="Например: Теплица №1, Зимний сад и т.д.">
                        </div>
                        <div class="form-group">
                            <label>Площадь (м²)</label>
                            <input type="number" id="greenhouse-area" class="form-input" min="1" step="0.1" placeholder="100">
                        </div>
                        <div class="form-group">
                            <label>Тип теплицы</label>
                            <select id="greenhouse-type" class="form-input">
                                <option value="film">Пленочная</option>
                                <option value="polycarbonate">Поликарбонатная</option>
                                <option value="glass">Стеклянная</option>
                                <option value="winter">Зимняя (отапливаемая)</option>
                                <option value="hydroponics">Гидропонная</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Основная культура</label>
                            <select id="greenhouse-crop" class="form-input">
                                <option value="tomatoes">${i18n.getCropName('tomatoes')}</option>
                                <option value="cucumbers">${i18n.getCropName('cucumbers')}</option>
                                <option value="peppers">Перец</option>
                                <option value="eggplant">Баклажаны</option>
                                <option value="greens">Зелень</option>
                                <option value="strawberries">Клубника</option>
                                <option value="flowers">Цветы</option>
                                <option value="seedlings">Рассада</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Примечания</label>
                            <textarea id="greenhouse-notes" class="form-input" rows="3" placeholder="Особенности, оборудование, система полива..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-save-greenhouse">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        document.getElementById('modal-save-greenhouse').addEventListener('click', () => {
            this.saveGreenhouse();
        });
    }
    
    saveGreenhouse() {
        const name = document.getElementById('greenhouse-name').value.trim();
        const area = parseFloat(document.getElementById('greenhouse-area').value) || 0;
        const type = document.getElementById('greenhouse-type').value;
        const crop = document.getElementById('greenhouse-crop').value;
        const notes = document.getElementById('greenhouse-notes').value.trim();
        
        if (!name || area <= 0) {
            app.showNotification('Заполните название и площадь', 'error');
            return;
        }
        
        const newGreenhouse = {
            id: app.generateId(),
            name: name,
            area: area,
            type: type,
            crop: crop,
            notes: notes,
            expenses: [],
            harvest: [],
            notesList: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.greenhouses.push(newGreenhouse);
        this.saveGreenhouses();
        app.closeModal();
        this.loadGreenhousesList();
        
        app.showNotification('Теплица успешно добавлена', 'success');
    }
    
    loadGreenhousesList() {
        const greenhousesList = document.getElementById('greenhouses-list');
        if (!greenhousesList) return;
        
        greenhousesList.innerHTML = '';
        
        if (this.greenhouses.length === 0) {
            greenhousesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-temperature-high"></i>
                    <h3>${i18n.getTranslation('home.greenhouses')}</h3>
                    <p>${i18n.getTranslation('home.noActivity')}</p>
                    <button class="btn btn-primary" id="add-first-greenhouse">
                        <i class="fas fa-plus"></i>
                        ${i18n.getTranslation('greenhouses.addButton')}
                    </button>
                </div>
            `;
            
            document.getElementById('add-first-greenhouse').addEventListener('click', () => {
                this.showAddGreenhouseModal();
            });
            
            return;
        }
        
        this.greenhouses.forEach(greenhouse => {
            const greenhouseCard = document.createElement('div');
            greenhouseCard.className = 'greenhouse-card';
            
            const cropName = this.getCropName(greenhouse.crop);
            const typeName = this.getGreenhouseTypeName(greenhouse.type);
            
            greenhouseCard.innerHTML = `
                <div class="card-header">
                    <h3>${greenhouse.name}</h3>
                    <span class="greenhouse-crop">${cropName}</span>
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${greenhouse.area} м²</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-home"></i>
                        <span>${typeName}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${greenhouse.expenses.length} расходов</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-leaf"></i>
                        <span>${greenhouse.harvest.length} урожаев</span>
                    </div>
                </div>
                ${greenhouse.notes ? `<p class="greenhouse-notes">${greenhouse.notes}</p>` : ''}
                <div class="card-actions">
                    <button class="btn btn-primary btn-view" data-id="${greenhouse.id}">
                        <i class="fas fa-eye"></i>
                        ${i18n.getTranslation('common.view')}
                    </button>
                    <button class="btn btn-secondary btn-edit" data-id="${greenhouse.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-delete" data-id="${greenhouse.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            greenhousesList.appendChild(greenhouseCard);
        });
        
        // Добавление обработчиков
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const greenhouseId = e.currentTarget.dataset.id;
                // В будущем можно добавить детальную страницу
                app.showNotification('Детальная страница в разработке', 'info');
            });
        });
        
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const greenhouseId = e.currentTarget.dataset.id;
                // В будущем можно добавить редактирование
                app.showNotification('Редактирование в разработке', 'info');
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const greenhouseId = e.currentTarget.dataset.id;
                this.deleteGreenhouse(greenhouseId);
            });
        });
    }
    
    getCropName(cropCode) {
        const crops = {
            'tomatoes': 'Помидоры',
            'cucumbers': 'Огурцы',
            'peppers': 'Перец',
            'eggplant': 'Баклажаны',
            'greens': 'Зелень',
            'strawberries': 'Клубника',
            'flowers': 'Цветы',
            'seedlings': 'Рассада',
            'other': 'Другое'
        };
        return crops[cropCode] || 'Неизвестно';
    }
    
    getGreenhouseTypeName(typeCode) {
        const types = {
            'film': 'Пленочная',
            'polycarbonate': 'Поликарбонатная',
            'glass': 'Стеклянная',
            'winter': 'Зимняя',
            'hydroponics': 'Гидропонная',
            'other': 'Другое'
        };
        return types[typeCode] || 'Неизвестно';
    }
    
    deleteGreenhouse(greenhouseId) {
        const greenhouse = this.greenhouses.find(g => g.id === greenhouseId);
        if (!greenhouse) return;
        
        const confirmMessage = `Удалить "${greenhouse.name}"?`;
        
        if (!confirm(confirmMessage)) return;
        
        this.greenhouses = this.greenhouses.filter(g => g.id !== greenhouseId);
        this.saveGreenhouses();
        this.loadGreenhousesList();
        
        app.showNotification('Теплица удалена', 'success');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.greenhouseManager = new GreenhouseManager();
});