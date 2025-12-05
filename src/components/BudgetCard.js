import { formatCurrency, calculatePercent } from '../utils/formatters.js';

export class BudgetCard {
  constructor(budget) {
    this.budget = budget;
  }

  render() {
    const { categoryName, limit, spent, remaining } = this.budget;
    const percent = calculatePercent(spent, limit);
    
    const iconMap = {
      'food': 'icon-food.svg',
      'transport': 'icon-transport.svg',
      'entertainment': 'icon-entertainment.svg',
      'home': 'icon-home.svg',
      'health': 'icon-health.svg'
    };
    const icon = iconMap[this.budget.category] || 'icon-filter-all.svg';
    
    return `
      <div class="category-item">
        <div class="category-icon">
          <img src="images/${icon}" alt="${categoryName} icon">
        </div>
        <div class="category-details">
          <p class="category-name">${categoryName}</p>
          <p class="category-info">Осталось ${formatCurrency(remaining)} из ${formatCurrency(limit)}</p>
        </div>
      </div>
    `;
  }

  static renderList(budgets) {
    if (!budgets || budgets.length === 0) {
      return '<p>Нет бюджетов</p>';
    }
    
    return budgets.map(b => new BudgetCard(b).render()).join('');
  }
}

