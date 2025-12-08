import { mockCategories } from '../data/mockData.js';

export class TransactionModal {
  constructor(onSave, onClose) {
    this.onSave = onSave;
    this.onClose = onClose;
    this.modal = null;
  }

  render() {
    const expenseCategories = mockCategories.filter(c => c.type === 'expense');
    const incomeCategories = mockCategories.filter(c => c.type === 'income');
    const today = new Date().toISOString().split('T')[0];

    return `
      <div class="modal-overlay" id="transaction-modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-title">Добавить транзакцию</h2>
            <button class="modal-close" id="modal-close-btn">&times;</button>
          </div>
          
          <form class="transaction-form" id="transaction-form">
            <div class="form-group">
              <label for="transaction-type">Тип транзакции</label>
              <div class="type-toggle">
                <button type="button" class="type-btn active" data-type="expense" id="type-expense">
                  Расход
                </button>
                <button type="button" class="type-btn" data-type="income" id="type-income">
                  Доход
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="transaction-date">Дата</label>
              <input 
                type="date" 
                id="transaction-date" 
                name="date" 
                class="form-input" 
                value="${today}"
                required
              >
            </div>

            <div class="form-group">
              <label for="transaction-description">Описание</label>
              <input 
                type="text" 
                id="transaction-description" 
                name="description" 
                class="form-input" 
                placeholder="Введите описание"
                required
              >
            </div>

            <div class="form-group">
              <label for="transaction-category">Категория</label>
              <select 
                id="transaction-category" 
                name="category" 
                class="form-select"
                required
              >
                <option value="">Выберите категорию</option>
                ${expenseCategories.map(cat => `
                  <option value="${cat.id}" data-type="expense">${cat.name}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label for="transaction-amount">Сумма</label>
              <input 
                type="number" 
                id="transaction-amount" 
                name="amount" 
                class="form-input" 
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
              >
            </div>

            <div class="form-actions">
              <button type="button" class="btn-cancel" id="cancel-btn">Отмена</button>
              <button type="submit" class="btn-submit">Добавить</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  mount() {
    const container = document.body;
    container.insertAdjacentHTML('beforeend', this.render());
    this.modal = document.getElementById('transaction-modal-overlay');
    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('transaction-form');
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const overlay = this.modal;
    const typeExpense = document.getElementById('type-expense');
    const typeIncome = document.getElementById('type-income');
    const categorySelect = document.getElementById('transaction-category');

    let currentType = 'expense';

    typeExpense.addEventListener('click', () => {
      currentType = 'expense';
      typeExpense.classList.add('active');
      typeIncome.classList.remove('active');
      this.updateCategories('expense');
    });

    typeIncome.addEventListener('click', () => {
      currentType = 'income';
      typeIncome.classList.add('active');
      typeExpense.classList.remove('active');
      this.updateCategories('income');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(currentType);
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

  updateCategories(type) {
    const categorySelect = document.getElementById('transaction-category');
    const categories = type === 'expense' 
      ? mockCategories.filter(c => c.type === 'expense')
      : mockCategories.filter(c => c.type === 'income');
    
    categorySelect.innerHTML = '<option value="">Выберите категорию</option>' +
      categories.map(cat => `
        <option value="${cat.id}">${cat.name}</option>
      `).join('');
  }

  handleSubmit(type) {
    const form = document.getElementById('transaction-form');
    const formData = new FormData(form);
    
    const categoryId = formData.get('category');
    const category = mockCategories.find(c => c.id === categoryId);
    
    const transactionData = {
      date: formData.get('date'),
      description: formData.get('description'),
      category: categoryId,
      categoryName: category ? category.name : '',
      amount: parseFloat(formData.get('amount')) * (type === 'expense' ? -1 : 1),
      type: type
    };

    if (this.onSave) {
      this.onSave(transactionData);
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

