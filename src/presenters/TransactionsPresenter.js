import { TransactionsView } from '../views/TransactionsView.js';
import { apiService } from '../api/apiService.js';

export class TransactionsPresenter {
  constructor() {
    this.view = new TransactionsView();
    this.setupCallbacks();
  }

  setupCallbacks() {
    this.view.onFiltersChangeCallback = async (filters) => {
      await this.loadTransactions(filters);
    };

    this.view.onAddTransactionCallback = () => {
      this.showAddTransactionModal();
    };
  }

  async loadTransactions(filters = {}) {
    try {
      const transactions = await apiService.getTransactions(filters);
      this.view.updateTransactions(transactions);
    } catch (error) {
      console.error('Ошибка загрузки транзакций:', error);
    }
  }

  showAddTransactionModal() {
    alert('Функция добавления транзакции будет реализована');
  }

  async init() {
    await this.loadTransactions(this.view.filters);
  }

  render() {
    this.view.render();
    this.init();
  }

  destroy() {
    if (this.view && typeof this.view.destroy === 'function') {
      this.view.destroy();
    }
  }
}

