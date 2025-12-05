export class Sidebar {
  constructor(container, activeRoute = 'overview') {
    this.container = container;
    this.activeRoute = activeRoute;
  }

  setActiveRoute(route) {
    this.activeRoute = route;
    this.mount();
  }

  render() {
    const routes = [
      { id: 'overview', name: 'Обзор', icon: 'icon-overview.svg' },
      { id: 'transactions', name: 'Транзакции', icon: 'icon-transactions.svg' },
      { id: 'budgets', name: 'Бюджеты', icon: 'icon-budgets.svg' },
      { id: 'analytics', name: 'Аналитика', icon: 'icon-analytics.svg' },
      { id: 'reports', name: 'Отчеты', icon: 'icon-reports.svg' }
    ];

    return `
      <aside class="sidebar">
        <nav class="sidebar-menu">
          ${routes.map(route => `
            <a href="#${route.id}" class="sidebar-item ${this.activeRoute === route.id ? 'active' : ''}" data-route="${route.id}">
              <img src="images/${route.icon}" alt="" class="sidebar-icon">
              <span>${route.name}</span>
            </a>
          `).join('')}
        </nav>
      </aside>
    `;
  }

  mount() {
    if (this.container) {
      this.container.innerHTML = this.render();
    }
  }
}

