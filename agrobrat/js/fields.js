// fields.js - Управление полями
class FieldManager {
    constructor() {
        this.fields = [];
        this.currentFieldId = null;
        this.init();
    }
    
    init() {
        console.log('Инициализация управления полями...');
        
        // Загрузка данных
        this.loadFields();
        
        // Инициализация кнопок
        this.initButtons();
        
        // Инициализация вкладок
        this.initTabs();
        
        console.log('Управление полями инициализировано:', this.fields.length, 'полей');
    }
    
    loadFields() {
        try {
            const saved = localStorage.getItem('fields');
            this.fields = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Ошибка загрузки полей:', error);
            this.fields = [];
        }
    }
    
    saveFields() {
        try {
            localStorage.setItem('fields', JSON.stringify(this.fields));
            if (typeof app !== 'undefined') {
                app.updateStats();
            }
        } catch (error) {
            console.error('Ошибка сохранения полей:', error);
        }
    }
    
    initButtons() {
        // Добавление поля
        const addFieldBtn = document.getElementById('add-field');
        const quickAddFieldBtn = document.getElementById('quick-add-field');
        
        if (addFieldBtn) {
            addFieldBtn.addEventListener('click', () => {
                this.showAddFieldModal();
            });
        }
        
        if (quickAddFieldBtn) {
            quickAddFieldBtn.addEventListener('click', () => {
                this.showAddFieldModal();
            });
        }
        
        // Назад из деталей
        const backBtn = document.getElementById('back-from-field');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                app.showPage('fields');
            });
        }
        
        // Калькулятор
        const seedRateInput = document.getElementById('seed-rate');
        const seedPriceInput = document.getElementById('seed-price');
        const addSeedCostBtn = document.getElementById('add-seed-cost');
        
        if (seedRateInput && seedPriceInput) {
            seedRateInput.addEventListener('input', () => this.calculateSeeds());
            seedPriceInput.addEventListener('input', () => this.calculateSeeds());
        }
        
        if (addSeedCostBtn) {
            addSeedCostBtn.addEventListener('click', () => this.addSeedCost());
        }
        
        // Добавление расходов, урожая, заметок
        const addExpenseBtn = document.getElementById('add-expense');
        const addHarvestBtn = document.getElementById('add-harvest');
        const addNoteBtn = document.getElementById('add-note');
        const editFieldBtn = document.getElementById('edit-field');
        
        if (addExpenseBtn) {
            addExpenseBtn.addEventListener('click', () => this.showAddExpenseModal());
        }
        
        if (addHarvestBtn) {
            addHarvestBtn.addEventListener('click', () => this.showAddHarvestModal());
        }
        
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', () => this.showAddNoteModal());
        }
        
        if (editFieldBtn) {
            editFieldBtn.addEventListener('click', () => this.showEditFieldModal());
        }
    }
    
    initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Убираем активный класс
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс
                btn.classList.add('active');
                const targetContent = document.getElementById(`${tabId}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    showAddFieldModal() {
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('fields.addButton')}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="modal-field-name">${i18n.getTranslation('fields.detailTitle')}</label>
                            <input type="text" id="modal-field-name" class="form-input" placeholder="Например: Поле №1">
                        </div>
                        <div class="form-group">
                            <label for="modal-field-area">${i18n.getTranslation('fields.area')} (га)</label>
                            <input type="number" id="modal-field-area" class="form-input" min="0.1" step="0.1" placeholder="10">
                        </div>
                        <div class="form-group">
                            <label for="modal-field-crop">${i18n.getTranslation('fields.crop')}</label>
                            <select id="modal-field-crop" class="form-input">
                                <option value="">${i18n.getTranslation('common.select')}</option>
                                <option value="wheat">${i18n.getCropName('wheat')}</option>
                                <option value="corn">${i18n.getCropName('corn')}</option>
                                <option value="potato">${i18n.getCropName('potato')}</option>
                                <option value="tomatoes">${i18n.getCropName('tomatoes')}</option>
                                <option value="cucumbers">${i18n.getCropName('cucumbers')}</option>
                                <option value="barley">${i18n.getCropName('barley')}</option>
                                <option value="sunflower">${i18n.getCropName('sunflower')}</option>
                                <option value="soybeans">${i18n.getCropName('soybeans')}</option>
                                <option value="other">${i18n.getCropName('other')}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="modal-field-notes">${i18n.getTranslation('common.notes')}</label>
                            <textarea id="modal-field-notes" class="form-input" rows="3" placeholder="Дополнительная информация..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-save-field">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        // Кнопка сохранения
        document.getElementById('modal-save-field').addEventListener('click', () => {
            this.saveNewField();
        });
    }
    
    saveNewField() {
        const name = document.getElementById('modal-field-name').value.trim();
        const area = parseFloat(document.getElementById('modal-field-area').value) || 0;
        const crop = document.getElementById('modal-field-crop').value;
        const notes = document.getElementById('modal-field-notes').value.trim();
        
        if (!name) {
            app.showNotification('Введите название поля', 'error');
            return;
        }
        
        if (area <= 0) {
            app.showNotification('Введите корректную площадь', 'error');
            return;
        }
        
        const newField = {
            id: app.generateId(),
            name: name,
            area: area,
            crop: crop,
            notes: notes,
            expenses: [],
            harvest: [],
            notesList: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.fields.push(newField);
        this.saveFields();
        app.closeModal();
        this.loadFieldsList();
        
        app.showNotification('Поле успешно добавлено', 'success');
    }
    
    loadFieldsList() {
        const fieldsList = document.getElementById('fields-list');
        if (!fieldsList) return;
        
        fieldsList.innerHTML = '';
        
        if (this.fields.length === 0) {
            fieldsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-seedling"></i>
                    <h3>${i18n.getTranslation('home.fields')}</h3>
                    <p>${i18n.getTranslation('home.noActivity')}</p>
                    <button class="btn btn-primary" id="add-first-field">
                        <i class="fas fa-plus"></i>
                        ${i18n.getTranslation('fields.addButton')}
                    </button>
                </div>
            `;
            
            document.getElementById('add-first-field').addEventListener('click', () => {
                this.showAddFieldModal();
            });
            
            return;
        }
        
        this.fields.forEach(field => {
            const fieldCard = document.createElement('div');
            fieldCard.className = 'field-card';
            fieldCard.innerHTML = `
                <div class="card-header">
                    <h3>${field.name}</h3>
                    <span class="field-crop">${i18n.getCropName(field.crop)}</span>
                </div>
                <div class="card-meta">
                    <div class="card-meta-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${field.area} га</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${field.expenses.length} ${i18n.getTranslation('common.expenses')}</span>
                    </div>
                    <div class="card-meta-item">
                        <i class="fas fa-wheat"></i>
                        <span>${field.harvest.length} ${i18n.getTranslation('fields.harvest')}</span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-view" data-id="${field.id}">
                        <i class="fas fa-eye"></i>
                        ${i18n.getTranslation('common.view')}
                    </button>
                    <button class="btn btn-secondary btn-edit" data-id="${field.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-delete" data-id="${field.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            fieldsList.appendChild(fieldCard);
        });
        
        // Добавление обработчиков
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fieldId = e.currentTarget.dataset.id;
                this.showFieldDetails(fieldId);
            });
        });
        
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fieldId = e.currentTarget.dataset.id;
                this.showEditFieldModal(fieldId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fieldId = e.currentTarget.dataset.id;
                this.deleteField(fieldId);
            });
        });
    }
    
    showFieldDetails(fieldId) {
        const field = this.fields.find(f => f.id === fieldId);
        if (!field) return;
        
        this.currentFieldId = fieldId;
        
        // Обновление информации
        document.getElementById('field-name-display').textContent = field.name;
        document.getElementById('field-area-display').textContent = field.area;
        document.getElementById('field-crop-display').textContent = i18n.getCropName(field.crop);
        
        // Расчет семян
        this.calculateSeeds();
        
        // Загрузка данных
        this.loadFieldExpenses();
        this.loadFieldHarvest();
        this.loadFieldNotes();
        this.calculateFieldSummary();
        
        // Переход на страницу
        app.showPage('field-detail');
    }
    
    calculateSeeds() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const seedRate = parseFloat(document.getElementById('seed-rate')?.value) || 200;
        const seedPrice = parseFloat(document.getElementById('seed-price')?.value) || 50;
        const area = field.area || 0;
        
        const seedAmount = (seedRate * area).toFixed(2);
        const totalCost = (seedAmount * seedPrice).toFixed(2);
        
        const seedAmountEl = document.getElementById('seed-amount');
        const totalCostEl = document.getElementById('seed-total-cost');
        
        if (seedAmountEl) seedAmountEl.textContent = `${seedAmount} кг`;
        if (totalCostEl) totalCostEl.textContent = `${app.formatCurrency(totalCost)}`;
    }
    
    addSeedCost() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const seedAmount = parseFloat(document.getElementById('seed-amount')?.textContent) || 0;
        const totalCost = parseFloat(document.getElementById('seed-total-cost')?.textContent.replace(/[^\d.]/g, '')) || 0;
        const seedRate = parseFloat(document.getElementById('seed-rate')?.value) || 200;
        
        if (totalCost <= 0) {
            app.showNotification('Сначала рассчитайте стоимость семян', 'warning');
            return;
        }
        
        const expense = {
            id: app.generateId(),
            type: 'seed',
            description: `Семена для ${field.name}`,
            amount: totalCost,
            quantity: seedAmount,
            unit: 'кг',
            date: new Date().toISOString(),
            notes: `Норма высева: ${seedRate} кг/га`
        };
        
        field.expenses.push(expense);
        field.updatedAt = new Date().toISOString();
        this.saveFields();
        this.loadFieldExpenses();
        this.calculateFieldSummary();
        
        app.showNotification('Стоимость семян добавлена в расходы', 'success');
    }
    
    loadFieldExpenses() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const expensesList = document.getElementById('field-expenses');
        if (!expensesList) return;
        
        expensesList.innerHTML = '';
        
        if (field.expenses.length === 0) {
            expensesList.innerHTML = `<p class="empty-text">${i18n.getTranslation('home.noActivity')}</p>`;
            return;
        }
        
        field.expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <div class="expense-info">
                    <h4>${expense.description}</h4>
                    <p>${app.formatDate(expense.date)} • ${expense.quantity} ${expense.unit}</p>
                    ${expense.notes ? `<small>${expense.notes}</small>` : ''}
                </div>
                <div class="expense-amount">
                    ${app.formatCurrency(expense.amount)}
                </div>
            `;
            expensesList.appendChild(expenseItem);
        });
    }
    
    loadFieldHarvest() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const harvestList = document.getElementById('field-harvest');
        if (!harvestList) return;
        
        harvestList.innerHTML = '';
        
        if (field.harvest.length === 0) {
            harvestList.innerHTML = `<p class="empty-text">${i18n.getTranslation('home.noActivity')}</p>`;
            return;
        }
        
        field.harvest.forEach(harvest => {
            const harvestItem = document.createElement('div');
            harvestItem.className = 'harvest-item';
            harvestItem.innerHTML = `
                <div class="harvest-info">
                    <h4>${i18n.getTranslation('fields.harvest')}</h4>
                    <p>${app.formatDate(harvest.date)} • ${harvest.quantity} ${harvest.unit}</p>
                    ${harvest.notes ? `<small>${harvest.notes}</small>` : ''}
                </div>
                <div class="harvest-amount">
                    ${app.formatCurrency(harvest.income)}
                </div>
            `;
            harvestList.appendChild(harvestItem);
        });
    }
    
    loadFieldNotes() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const notesList = document.getElementById('field-notes');
        if (!notesList) return;
        
        notesList.innerHTML = '';
        
        if (field.notesList.length === 0) {
            notesList.innerHTML = `<p class="empty-text">${i18n.getTranslation('home.noActivity')}</p>`;
            return;
        }
        
        field.notesList.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.innerHTML = `
                <div class="note-date">
                    ${app.formatDate(note.date)}
                </div>
                <div class="note-content">
                    <p>${note.content}</p>
                </div>
            `;
            notesList.appendChild(noteItem);
        });
    }
    
    calculateFieldSummary() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const totalExpenses = field.expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
        const totalIncome = field.harvest.reduce((sum, har) => sum + (parseFloat(har.income) || 0), 0);
        const totalProfit = totalIncome - totalExpenses;
        
        document.getElementById('field-total-expenses').textContent = app.formatCurrency(totalExpenses);
        document.getElementById('field-total-income').textContent = app.formatCurrency(totalIncome);
        
        const profitElement = document.getElementById('field-total-profit');
        profitElement.textContent = app.formatCurrency(totalProfit);
        profitElement.style.color = totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    }
    
    showAddExpenseModal() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('common.addExpense')}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Описание</label>
                            <input type="text" id="expense-description" class="form-input" placeholder="Например: Удобрения, топливо и т.д.">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Сумма (руб)</label>
                                <input type="number" id="expense-amount" class="form-input" min="0" step="0.01" placeholder="1000">
                            </div>
                            <div class="form-group">
                                <label>Количество</label>
                                <input type="number" id="expense-quantity" class="form-input" min="0" step="0.01" placeholder="1">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Единица измерения</label>
                                <input type="text" id="expense-unit" class="form-input" placeholder="кг, литр, шт">
                            </div>
                            <div class="form-group">
                                <label>Дата</label>
                                <input type="date" id="expense-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Примечания</label>
                            <textarea id="expense-notes" class="form-input" rows="2" placeholder="Дополнительная информация..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-save-expense">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        document.getElementById('modal-save-expense').addEventListener('click', () => {
            this.saveExpense();
        });
    }
    
    saveExpense() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const description = document.getElementById('expense-description').value.trim();
        const amount = parseFloat(document.getElementById('expense-amount').value) || 0;
        const quantity = parseFloat(document.getElementById('expense-quantity').value) || 1;
        const unit = document.getElementById('expense-unit').value.trim() || 'шт';
        const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];
        const notes = document.getElementById('expense-notes').value.trim();
        
        if (!description || amount <= 0) {
            app.showNotification('Заполните описание и сумму', 'error');
            return;
        }
        
        const expense = {
            id: app.generateId(),
            type: 'manual',
            description: description,
            amount: amount,
            quantity: quantity,
            unit: unit,
            date: new Date(date).toISOString(),
            notes: notes
        };
        
        field.expenses.push(expense);
        field.updatedAt = new Date().toISOString();
        this.saveFields();
        app.closeModal();
        this.loadFieldExpenses();
        this.calculateFieldSummary();
        
        app.showNotification('Расход успешно добавлен', 'success');
    }
    
    showAddHarvestModal() {
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('fields.addHarvest')}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Количество</label>
                            <input type="number" id="harvest-quantity" class="form-input" min="0" step="0.01" placeholder="100">
                        </div>
                        <div class="form-group">
                            <label>Единица измерения</label>
                            <select id="harvest-unit" class="form-input">
                                <option value="кг">Килограммы (кг)</option>
                                <option value="ц">Центнеры (ц)</option>
                                <option value="т">Тонны (т)</option>
                                <option value="меш">Мешки</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Доход (руб)</label>
                            <input type="number" id="harvest-income" class="form-input" min="0" step="0.01" placeholder="50000">
                        </div>
                        <div class="form-group">
                            <label>Дата сбора</label>
                            <input type="date" id="harvest-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Примечания</label>
                            <textarea id="harvest-notes" class="form-input" rows="2" placeholder="Качество, сорт, условия хранения..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-save-harvest">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        document.getElementById('modal-save-harvest').addEventListener('click', () => {
            this.saveHarvest();
        });
    }
    
    saveHarvest() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const quantity = parseFloat(document.getElementById('harvest-quantity').value) || 0;
        const unit = document.getElementById('harvest-unit').value;
        const income = parseFloat(document.getElementById('harvest-income').value) || 0;
        const date = document.getElementById('harvest-date').value || new Date().toISOString().split('T')[0];
        const notes = document.getElementById('harvest-notes').value.trim();
        
        if (quantity <= 0 || income <= 0) {
            app.showNotification('Заполните количество и доход', 'error');
            return;
        }
        
        const harvest = {
            id: app.generateId(),
            quantity: quantity,
            unit: unit,
            income: income,
            date: new Date(date).toISOString(),
            notes: notes
        };
        
        field.harvest.push(harvest);
        field.updatedAt = new Date().toISOString();
        this.saveFields();
        app.closeModal();
        this.loadFieldHarvest();
        this.calculateFieldSummary();
        
        app.showNotification('Урожай успешно добавлен', 'success');
    }
    
    showAddNoteModal() {
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('common.addNote')}</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Заметка</label>
                            <textarea id="note-content" class="form-input" rows="4" placeholder="Введите вашу заметку..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-save-note">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        document.getElementById('modal-save-note').addEventListener('click', () => {
            this.saveNote();
        });
    }
    
    saveNote() {
        const field = this.fields.find(f => f.id === this.currentFieldId);
        if (!field) return;
        
        const content = document.getElementById('note-content').value.trim();
        
        if (!content) {
            app.showNotification('Введите текст заметки', 'error');
            return;
        }
        
        const note = {
            id: app.generateId(),
            content: content,
            date: new Date().toISOString()
        };
        
        field.notesList.push(note);
        field.updatedAt = new Date().toISOString();
        this.saveFields();
        app.closeModal();
        this.loadFieldNotes();
        
        app.showNotification('Заметка успешно добавлена', 'success');
    }
    
    showEditFieldModal(fieldId = null) {
        const id = fieldId || this.currentFieldId;
        const field = this.fields.find(f => f.id === id);
        if (!field) return;
        
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${i18n.getTranslation('common.edit')} поле</h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>${i18n.getTranslation('fields.detailTitle')}</label>
                            <input type="text" id="edit-field-name" class="form-input" value="${field.name}">
                        </div>
                        <div class="form-group">
                            <label>${i18n.getTranslation('fields.area')} (га)</label>
                            <input type="number" id="edit-field-area" class="form-input" value="${field.area}" min="0.1" step="0.1">
                        </div>
                        <div class="form-group">
                            <label>${i18n.getTranslation('fields.crop')}</label>
                            <select id="edit-field-crop" class="form-input">
                                <option value="wheat" ${field.crop === 'wheat' ? 'selected' : ''}>${i18n.getCropName('wheat')}</option>
                                <option value="corn" ${field.crop === 'corn' ? 'selected' : ''}>${i18n.getCropName('corn')}</option>
                                <option value="potato" ${field.crop === 'potato' ? 'selected' : ''}>${i18n.getCropName('potato')}</option>
                                <option value="tomatoes" ${field.crop === 'tomatoes' ? 'selected' : ''}>${i18n.getCropName('tomatoes')}</option>
                                <option value="cucumbers" ${field.crop === 'cucumbers' ? 'selected' : ''}>${i18n.getCropName('cucumbers')}</option>
                                <option value="barley" ${field.crop === 'barley' ? 'selected' : ''}>${i18n.getCropName('barley')}</option>
                                <option value="sunflower" ${field.crop === 'sunflower' ? 'selected' : ''}>${i18n.getCropName('sunflower')}</option>
                                <option value="soybeans" ${field.crop === 'soybeans' ? 'selected' : ''}>${i18n.getCropName('soybeans')}</option>
                                <option value="other" ${field.crop === 'other' ? 'selected' : ''}>${i18n.getCropName('other')}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>${i18n.getTranslation('common.notes')}</label>
                            <textarea id="edit-field-notes" class="form-input" rows="3">${field.notes || ''}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary close-modal">${i18n.getTranslation('common.cancel')}</button>
                            <button type="button" class="btn btn-primary" id="modal-update-field">${i18n.getTranslation('common.save')}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        app.showModal(modalHTML);
        
        document.getElementById('modal-update-field').addEventListener('click', () => {
            this.updateField(id);
        });
    }
    
    updateField(fieldId) {
        const field = this.fields.find(f => f.id === fieldId);
        if (!field) return;
        
        const name = document.getElementById('edit-field-name').value.trim();
        const area = parseFloat(document.getElementById('edit-field-area').value) || 0;
        const crop = document.getElementById('edit-field-crop').value;
        const notes = document.getElementById('edit-field-notes').value.trim();
        
        if (!name || area <= 0) {
            app.showNotification('Заполните обязательные поля', 'error');
            return;
        }
        
        field.name = name;
        field.area = area;
        field.crop = crop;
        field.notes = notes;
        field.updatedAt = new Date().toISOString();
        
        this.saveFields();
        app.closeModal();
        
        if (fieldId === this.currentFieldId) {
            this.showFieldDetails(fieldId);
        } else {
            this.loadFieldsList();
        }
        
        app.showNotification('Поле успешно обновлено', 'success');
    }
    
    deleteField(fieldId) {
        const field = this.fields.find(f => f.id === fieldId);
        if (!field) return;
        
        const confirmMessage = i18n.currentLang === 'ru' ? 
            `Удалить поле "${field.name}"? Это действие нельзя отменить.` :
            i18n.currentLang === 'kg' ?
            `"${field.name}" талаасын өчүрүү? Бул аракетти кайтаруу мүмкүн эмес.` :
            `"${field.name}" 밭을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.`;
        
        if (!confirm(confirmMessage)) return;
        
        this.fields = this.fields.filter(f => f.id !== fieldId);
        this.saveFields();
        
        if (fieldId === this.currentFieldId) {
            app.showPage('fields');
        }
        
        this.loadFieldsList();
        app.showNotification('Поле удалено', 'success');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.fieldManager = new FieldManager();
});