import { BudgetsView } from '../views/BudgetsView.js';
import { apiService } from '../api/apiService.js';

export class BudgetsPresenter {
  constructor() {
    this.view = new BudgetsView();
    this.categories = [];
    this.view.bindHandlers({
      onAddBudget: this.handleAddBudget.bind(this)
    });
  }

  async loadBudgets() {
    try {
      const [budgets, categories] = await Promise.all([
        apiService.getBudgets(),
        apiService.getCategories('expense')
      ]);
      this.categories = categories;
      this.view.updateBudgets(budgets, categories);
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

  async handleAddBudget({ category, limit }) {
    if (!category || Number.isNaN(limit) || limit <= 0) {
      return;
    }

    const categoryMeta = this.categories.find((c) => c.id === category);
    const categoryName = categoryMeta ? categoryMeta.name : category;

    try {
      await apiService.createBudget({ category, categoryName, limit: Number(limit), spent: 0 });
      await this.loadBudgets();
    } catch (error) {
      console.error('Ошибка добавления бюджета:', error);
    }
  }

  destroy() {
    if (this.view && typeof this.view.destroy === 'function') {
      this.view.destroy();
    }
  }
}

