import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { TransactionCard } from '../components/TransactionCard.js';
import { mockCategories } from '../data/mockData.js';

export class TransactionsView {
  constructor() {
    this.header = null;
    this.sidebar = null;
    this.transactions = [];
    this.filters = {
      category: 'all',
      search: ''
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
      this.sidebar = new Sidebar(sidebarContainer, 'transactions');
      this.sidebar.mount();
    }

    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.innerHTML = this.renderContent();
      this.attachEventListeners();
    }
  }

  renderContent() {
    return `
      <main class="main-content">
        <div class="content-header">
          <h1>Транзакции</h1>
          <button class="btn-add" id="add-transaction-btn">Добавить</button>
        </div>

        <div class="search-bar">
          <div class="search-input-wrapper">
            <img src="images/icon-search.svg" alt="" class="search-icon">
            <input type="text" placeholder="Поиск" class="search-input" id="search-input">
          </div>
        </div>

        <div class="filters-scroll-container">
          <div class="filters">
            <button class="filter-tag ${this.filters.category === 'all' ? 'active' : ''}" data-category="all">
              <img src="images/icon-filter-all.svg" alt="">
              <span>Все</span>
            </button>
            ${this.renderFilterButtons()}
          </div>
        </div>

       

        <div class="transactions-table-container">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Описание</th>
                <th>Категория</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody id="transactions-tbody">
              ${TransactionCard.renderList(this.transactions)}
            </tbody>
          </table>
        </div>
      </main>
    `;
  }

  renderFilterButtons() {
    const expenseCategories = mockCategories.filter(c => c.type === 'expense');
    return expenseCategories.map(category => `
      <button class="filter-tag ${this.filters.category === category.id ? 'active' : ''}" data-category="${category.id}">
        <img src="images/${category.icon}" alt="">
        <span>${category.name}</span>
      </button>
    `).join('');
  }

  attachEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value;
        this.onFiltersChange();
      });
    }

    const filterButtons = document.querySelectorAll('.filter-tag');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        this.filters.category = category;
        this.onFiltersChange();
      });
    });

    const addBtn = document.getElementById('add-transaction-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.onAddTransaction();
      });
    }
  }

  updateTransactions(transactions) {
    this.transactions = transactions;
    const tbody = document.getElementById('transactions-tbody');
    if (tbody) {
      tbody.innerHTML = TransactionCard.renderList(transactions);
    }
  }

  onFiltersChange() {
    const filterButtons = document.querySelectorAll('.filter-tag');
    filterButtons.forEach(btn => {
      const category = btn.getAttribute('data-category');
      if (category === this.filters.category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (this.onFiltersChangeCallback) {
      this.onFiltersChangeCallback(this.filters);
    }
  }

  onAddTransaction() {
    if (this.onAddTransactionCallback) {
      this.onAddTransactionCallback();
    }
  }

  destroy() {
    this.header = null;
    this.sidebar = null;
    this.transactions = [];
  }
}

