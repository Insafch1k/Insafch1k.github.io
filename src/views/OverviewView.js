import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { TransactionCard } from '../components/TransactionCard.js';
import { formatCurrency } from '../utils/formatters.js';

export class OverviewView {
  constructor() {
    this.header = null;
    this.sidebar = null;
    this.data = null;
  }

  render() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      this.header = new Header(headerContainer);
      this.header.mount();
    }

    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      this.sidebar = new Sidebar(sidebarContainer, 'overview');
      this.sidebar.mount();
    }

    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.renderContent();
    }
  }

  renderContent() {
    if (!this.data) {
      return '<div>Загрузка...</div>';
    }

    const { totalBalance, monthlyIncome, monthlyExpenses, recentTransactions, expensesByMonth } = this.data;

    return `
      <main class="dashboard-content">
        <h1 class="page-title">Обзор</h1>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Общий баланс</div>
            <div class="stat-value">${formatCurrency(totalBalance)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Ежемесячный доход</div>
            <div class="stat-value">${formatCurrency(monthlyIncome)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Ежемесячные расходы</div>
            <div class="stat-value">${formatCurrency(monthlyExpenses)}</div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="chart-section">
          <h2 class="section-title">Тенденции расходов</h2>
          <div class="chart-container">
            <p class="chart-subtitle">Расходы за последние 6 месяцев</p>
            <div class="chart-visual">
              <img src="images/chart-expenses.svg" alt="Expenses Chart" class="chart-line">
              <div class="chart-labels">
                ${expensesByMonth.map(month => `<span>${month.month}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="transactions-section">
          <h2 class="section-title">Последние транзакции</h2>
          <div class="transactions-table">
            <div class="table-header">
              <div class="col col-date">Дата</div>
              <div class="col col-category">Категория</div>
              <div class="col col-desc">Описание</div>
              <div class="col col-amount">Сумма</div>
            </div>
            ${TransactionCard.renderListForOverview(recentTransactions)}
          </div>
        </div>
      </main>
    `;
  }

  updateData(data) {
    this.data = data;
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.renderContent();
    }
  }

  destroy() {
    this.header = null;
    this.sidebar = null;
    this.data = null;
  }
}

