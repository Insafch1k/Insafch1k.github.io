import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { formatCurrency, formatPercent, calculatePercent } from '../utils/formatters.js';

export class AnalyticsView {
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
      this.sidebar = new Sidebar(sidebarContainer, 'analytics');
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

    const { expensesByCategory, incomeExpenseTrends, budgets } = this.data;
    const maxExpense = Math.max(...expensesByCategory.map(e => e.amount));
    const totalExpenses = expensesByCategory.reduce((sum, e) => sum + e.amount, 0);

    return `
      <main class="main-content">
        <h1 class="page-title">Аналитика</h1>

        <!-- Expenses Category Section -->
        <div class="content-block">
          <h2 class="section-title">Расходы по категориям</h2>
          
          <div class="stats-row">
            <div class="stat-label">Расходы</div>
            <div class="stat-value-group">
              <div class="stat-amount">${formatCurrency(totalExpenses)}</div>
              <div class="stat-trend">
                <span class="trend-label">Текущий месяц</span>
                <span class="trend-value negative">-5%</span>
              </div>
            </div>
          </div>

          <div class="bar-chart-container">
            ${expensesByCategory.map(item => {
              const height = (item.amount / maxExpense) * 100;
              return `
                <div class="bar-group">
                  <div class="bar" style="height: ${height}px;"></div>
                  <span class="bar-label">${item.categoryName}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Trends Section -->
        <div class="content-block">
          <h2 class="section-title">Тенденции доходов и расходов</h2>
          
          <div class="stats-row">
            <div class="stat-label">Доходы и расходы</div>
            <div class="stat-value-group">
              <div class="stat-amount">${formatCurrency(incomeExpenseTrends.total)}</div>
              <div class="stat-trend">
                <span class="trend-label">${incomeExpenseTrends.period}</span>
                <span class="trend-value positive">${formatPercent(incomeExpenseTrends.trend)}</span>
              </div>
            </div>
          </div>

          <div class="line-chart-container">
            <img src="images/chart-income-expense-trends.svg" alt="Income and Expense Trends Chart" class="line-chart-svg">
            <div class="chart-x-axis">
              ${incomeExpenseTrends.data.map(item => `<span>${item.month}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Budgets Section -->
        <div class="content-block">
          <h2 class="section-title">Бюджеты</h2>
          
          <div class="budget-list">
            ${budgets.map(budget => {
              return `
                <div class="budget-item">
                  <div class="budget-header">
                    <span class="budget-name">${budget.categoryName}</span>
                    <span class="budget-percent">${budget.percent}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" style="width: ${budget.percent}%;"></div>
                  </div>
                  <div class="budget-footer">
                    <span>${formatCurrency(budget.spent)} / ${formatCurrency(budget.limit)}</span>
                  </div>
                </div>
              `;
            }).join('')}
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

