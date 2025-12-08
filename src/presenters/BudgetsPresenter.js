import { BudgetsView } from '../views/BudgetsView.js';
import { apiService } from '../api/apiService.js';
import { BudgetModal } from '../components/BudgetModal.js';

export class BudgetsPresenter {
  constructor() {
    this.view = new BudgetsView();
    this.setupCallbacks();
  }

  setupCallbacks() {
    this.view.setOnEditCallback((budgetId) => {
      this.showEditBudgetModal(budgetId);
    });
  }

  async loadBudgets() {
    try {
      const budgets = await apiService.getBudgets();
      console.log('Загружены бюджеты:', budgets);
      this.view.updateBudgets(budgets);
      this.attachEditListeners();
    } catch (error) {
      console.error('Ошибка загрузки бюджетов:', error);
    }
  }

  attachEditListeners() {
    const editButtons = document.querySelectorAll('.btn-edit-budget');
    editButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const budgetId = e.currentTarget.getAttribute('data-budget-id');
        this.showEditBudgetModal(budgetId);
      });
    });
  }

  showEditBudgetModal(budgetId) {
    const budgets = this.view.budgets;
    const budgetIdStr = String(budgetId);
    const budget = budgets.find(b => {
      const bId = String(b.id);
      return bId === budgetIdStr;
    });
    
    if (!budget) {
      console.error('Бюджет не найден:', budgetId, budgets);
      alert('Бюджет не найден');
      return;
    }
    
    console.log('Редактирование бюджета:', budget);
    
    const modal = new BudgetModal(
      budget,
      async (budgetData) => {
        try {
          if (budgetData.id) {
            const id = String(budgetData.id);
            const { id: _, ...updateData } = budgetData;
            console.log('Обновление бюджета:', id, updateData);
            const result = await apiService.updateBudget(id, updateData);
            console.log('Результат обновления:', result);
          } else {
            console.log('Создание нового бюджета:', budgetData);
            await apiService.createBudget(budgetData);
          }
          await this.loadBudgets();
        } catch (error) {
          console.error('Ошибка сохранения бюджета:', error);
          alert('Не удалось сохранить бюджет: ' + error.message);
        }
      },
      () => {
      }
    );
    
    modal.mount();
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

