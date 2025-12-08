import { mockCategories } from '../data/mockData.js';

export class BudgetModal {
  constructor(budget, onSave, onClose) {
    this.budget = budget;
    this.onSave = onSave;
    this.onClose = onClose;
    this.modal = null;
  }

  render() {
    const expenseCategories = mockCategories.filter(c => c.type === 'expense');
    const { id, category, categoryName, limit, spent } = this.budget || {};
    const remaining = limit - spent;

    return `
      <div class="modal-overlay" id="budget-modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title">${id ? 'Редактировать бюджет' : 'Добавить бюджет'}</h2>
            <button class="modal-close" id="modal-close-btn">&times;</button>
          </div>
          
          <form class="transaction-form" id="budget-form">
            <div class="form-group">
              <label for="budget-category">Категория</label>
              <select 
                id="budget-category" 
                name="category" 
                class="form-select"
                required
                ${id ? 'disabled' : ''}
              >
                <option value="">Выберите категорию</option>
                ${expenseCategories.map(cat => `
                  <option value="${cat.id}" ${cat.id === category ? 'selected' : ''}>${cat.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label for="budget-limit">Лимит бюджета (₽)</label>
              <input 
                type="number" 
                id="budget-limit" 
                name="limit" 
                class="form-input" 
                placeholder="0.00"
                step="0.01"
                min="0.01"
                value="${limit || ''}"
                required
              >
            </div>

            <div class="form-group">
              <label for="budget-spent">Потрачено (₽)</label>
              <input 
                type="number" 
                id="budget-spent" 
                name="spent" 
                class="form-input" 
                placeholder="0.00"
                step="0.01"
                min="0"
                value="${spent || ''}"
                required
              >
            </div>

            <div class="form-group">
              <label>Остаток</label>
              <div class="form-readonly" id="budget-remaining">
                ${remaining !== undefined ? remaining.toFixed(2) : '0.00'} ₽
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-cancel" id="cancel-btn">Отмена</button>
              <button type="submit" class="btn-submit">Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  mount() {
    const container = document.body;
    container.insertAdjacentHTML('beforeend', this.render());
    this.modal = document.getElementById('budget-modal-overlay');
    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('budget-form');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const overlay = this.modal;
    const limitInput = document.getElementById('budget-limit');
    const spentInput = document.getElementById('budget-spent');
    const remainingDisplay = document.getElementById('budget-remaining');

    const updateRemaining = () => {
      const limit = parseFloat(limitInput.value) || 0;
      const spent = parseFloat(spentInput.value) || 0;
      const remaining = limit - spent;
      remainingDisplay.textContent = `${remaining.toFixed(2)} ₽`;
      
      if (remaining < 0) {
        remainingDisplay.style.color = '#ef4444';
      } else {
        remainingDisplay.style.color = 'var(--color-primary)';
      }
    };

    limitInput.addEventListener('input', updateRemaining);
    spentInput.addEventListener('input', updateRemaining);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    closeBtn.addEventListener('click', () => {
      this.close();
    });

    cancelBtn.addEventListener('click', () => {
      this.close();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });
  }

  handleSubmit() {
    const form = document.getElementById('budget-form');
    const formData = new FormData(form);
    
    const categoryId = formData.get('category');
    const category = mockCategories.find(c => c.id === categoryId);
    
    const budgetData = {
      category: categoryId,
      categoryName: category ? category.name : '',
      limit: parseFloat(formData.get('limit')),
      spent: parseFloat(formData.get('spent')),
      remaining: parseFloat(formData.get('limit')) - parseFloat(formData.get('spent'))
    };

    if (this.budget && this.budget.id) {
      budgetData.id = String(this.budget.id);
    }

    if (this.onSave) {
      this.onSave(budgetData);
    }

    this.close();
  }

  close() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
    if (this.onClose) {
      this.onClose();
    }
  }
}

