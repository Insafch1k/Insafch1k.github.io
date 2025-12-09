import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { BudgetCard } from '../components/BudgetCard.js';
import { formatCurrency } from '../utils/formatters.js';

export class BudgetsView {
  constructor() {
    this.header = null;
    this.sidebar = null;
    this.budgets = [];
    this.summary = null;
    this.categories = [];
    this.handlers = {
      onAddBudget: null
    };
  }

  render() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      this.header = new Header(headerContainer);
      this.header.mount();
    }

    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      this.sidebar = new Sidebar(sidebarContainer, 'budgets');
      this.sidebar.mount();
    }

    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.renderContent();
    }
  }

  renderContent() {
    const totalLimit = this.budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = this.budgets.reduce((sum, b) => sum + b.spent, 0);
    const totalRemaining = totalLimit - totalSpent;
    const currentMonth = new Date().toLocaleString('ru', { month: 'long' });

    return `
      <main class="main-content">
        <h2 class="content-title">Бюджеты</h2>
        <article class="budget-summary-card">
          <div class="summary-text">
            <h3>Ваш бюджет на ${currentMonth}</h3>
            <p>Осталось ${formatCurrency(totalRemaining)} из ${formatCurrency(totalLimit)}</p>
          </div>
        </article>
        <section class="add-budget-section">
          <h3 class="section-title">Добавить категорию</h3>
          <form id="add-budget-form" class="budget-form">
            <div class="form-row">
              <label>
                Категория
                <select id="budget-category" required>
                  <option value="">Выберите категорию</option>
                  ${this.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </label>
              <label>
                Лимит
                <input type="number" id="budget-limit" min="0" step="100" placeholder="Например, 10000" required>
              </label>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Добавить</button>
              <p class="form-hint" id="budget-form-message"></p>
            </div>
          </form>
        </section>
        <section class="categories-section">
          <h3 class="section-title">Категории</h3>
          <div class="categories-list">
            ${BudgetCard.renderList(this.budgets)}
          </div>
        </section>
      </main>
    `;
  }

  updateBudgets(budgets, categories = this.categories) {
    this.budgets = budgets;
    this.categories = categories;
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.renderContent();
      this.attachEvents();
    }
  }

  bindHandlers(handlers = {}) {
    this.handlers = { ...this.handlers, ...handlers };
  }

  attachEvents() {
    const form = document.getElementById('add-budget-form');
    if (form && typeof this.handlers.onAddBudget === 'function') {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const category = document.getElementById('budget-category')?.value || '';
        const limitValue = document.getElementById('budget-limit')?.value || '';
        this.handlers.onAddBudget({ category, limit: Number(limitValue) });
      });
    }
  }

  destroy() {
    this.header = null;
    this.sidebar = null;
    this.budgets = [];
  }
}

