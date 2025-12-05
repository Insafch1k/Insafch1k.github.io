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
          <div class="summary-image">
            <img src="images/budget-illustration.png" alt="Illustration of plants on a desk">
          </div>
        </article>
        <section class="categories-section">
          <h3 class="section-title">Категории</h3>
          <div class="categories-list">
            ${BudgetCard.renderList(this.budgets)}
          </div>
        </section>
      </main>
    `;
  }

  updateBudgets(budgets) {
    this.budgets = budgets;
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.renderContent();
    }
  }

  destroy() {
    this.header = null;
    this.sidebar = null;
    this.budgets = [];
  }
}

