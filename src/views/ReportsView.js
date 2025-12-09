import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { formatCurrency, formatPercent, calculatePercent } from '../utils/formatters.js';

export class ReportsView {
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
      this.sidebar = new Sidebar(sidebarContainer, 'reports');
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

    const { summary, trends, expensesByCategory } = this.data;
    const maxExpense = Math.max(...expensesByCategory.map(e => e.amount));

    return `
      <main class="main-content">
        <!-- Page Header -->
        <div class="content-header">
          <h1>Отчеты</h1>
          <p>Просматривайте свои финансовые отчеты</p>
        </div>

        <!-- Summary Cards -->
        <div class="summary-cards">
          <div class="card">
            <div class="card-title">Доход</div>
            <div class="card-amount">${formatCurrency(summary.income)}</div>
            <div class="card-trend positive">${formatPercent(summary.incomeTrend)}</div>
          </div>
          <div class="card">
            <div class="card-title">Расходы</div>
            <div class="card-amount">${formatCurrency(summary.expenses)}</div>
            <div class="card-trend negative">${formatPercent(summary.expensesTrend)}</div>
          </div>
          <div class="card">
            <div class="card-title">Прибыль</div>
            <div class="card-amount">${formatCurrency(summary.profit)}</div>
            <div class="card-trend positive">${formatPercent(summary.profitTrend)}</div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-section">
          <!-- Line Chart -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Тенденции</h3>
              <div class="chart-info">
                <h4>Доходы и расходы</h4>
                <div class="chart-meta">
                  <span>${trends.period}</span>
                  <span class="positive">${formatPercent(trends.trend)}</span>
                </div>
              </div>
            </div>
            <div class="line-chart-visual">
              <div class="chart-value-overlay">${formatCurrency(trends.value)}</div>
              <img src="images/chart-line.svg" alt="Line Chart" class="line-chart-svg">
            </div>
            <div class="chart-labels">
              ${trends.data.map(item => `<span>${item.month}</span>`).join('')}
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="chart-container">
            <div class="chart-header spacer-header"></div>
            <div class="chart-info">
              <h4>Расходы по категориям</h4>
              <div class="chart-meta">
                <span>За последний месяц</span>
                <span class="negative">-5%</span>
              </div>
            </div>
            <div class="bar-chart-visual">
              <div class="chart-value-overlay">${formatCurrency(summary.expenses)}</div>
              <div class="bars-wrapper">
                ${expensesByCategory.map(item => {
                  const height = (item.amount / maxExpense) * 136.5;
                  return `
                    <div class="bar-group">
                      <div class="bar" style="height: ${height}px;"></div>
                      <span class="bar-label">${item.categoryName}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Details Table -->
        <div class="details-section">
          <h3>Детали</h3>
          <div class="table-container">
            <div class="table-header">
              <div class="col-category">Категория</div>
              <div class="col-amount">Сумма</div>
              <div class="col-percent">Процент</div>
            </div>
            <div class="table-body">
              ${expensesByCategory.map(item => `
                <div class="table-row">
                  <div class="col-category">${item.categoryName}</div>
                  <div class="col-amount highlight">${formatCurrency(item.amount)}</div>
                  <div class="col-percent highlight">${item.percent}%</div>
                </div>
              `).join('')}
            </div>
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

