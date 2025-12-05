import { BudgetsView } from '../views/BudgetsView.js';
import { apiService } from '../api/apiService.js';

export class BudgetsPresenter {
  constructor() {
    this.view = new BudgetsView();
  }

  async loadBudgets() {
    try {
      const budgets = await apiService.getBudgets();
      this.view.updateBudgets(budgets);
    } catch (error) {
      console.error('Ошибка загрузки бюджетов:', error);
    }
  }

  async init() {
    await this.loadBudgets();
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

