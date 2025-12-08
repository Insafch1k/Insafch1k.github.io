import { formatCurrency, calculatePercent } from '../utils/formatters.js';

export class BudgetCard {
  constructor(budget, onEdit) {
    this.budget = budget;
    this.onEdit = onEdit;
  }

  render() {
    const { id, categoryName, limit, spent, remaining } = this.budget;
    
    const iconMap = {
      'food': 'icon-food.svg',
      'transport': 'icon-transport.svg',
      'entertainment': 'icon-entertainment.svg',
      'home': 'icon-home.svg',
      'health': 'icon-health.svg',
      'bills': 'icon-filter-bills.svg'
    };
    const icon = iconMap[this.budget.category] || 'icon-filter-all.svg';
    
    return `
      <div class="category-item" data-budget-id="${id}">
        <div class="category-icon">
          <img src="images/${icon}" alt="${categoryName} icon">
        </div>
        <div class="category-details">
          <p class="category-name">${categoryName}</p>
          <p class="category-info">Осталось ${formatCurrency(remaining)} из ${formatCurrency(limit)}</p>
        </div>
        <button class="btn-edit-budget" data-budget-id="${id}" title="Редактировать бюджет">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74169 14.525L15.5834 7.28335C16.7667 6.08335 17.3 4.60835 15.4584 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
  }

  static renderList(budgets, onEdit) {
    if (!budgets || budgets.length === 0) {
      return '<p>Нет бюджетов</p>';
    }
    
    return budgets.map(b => new BudgetCard(b, onEdit).render()).join('');
  }
}

