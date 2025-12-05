export class Header {
  constructor(container) {
    this.container = container;
  }

  render() {
    return `
      <header class="app-header">
        <div class="header-inner container">
          <div class="logo">
            <span>Мои финансы</span>
          </div>
          <div class="header-right">
            <nav class="top-nav">
              <a href="#overview" class="nav-link" data-route="overview">Обзор</a>
              <a href="#transactions" class="nav-link" data-route="transactions">Транзакции</a>
              <a href="#budgets" class="nav-link" data-route="budgets">Бюджеты</a>
              <a href="#analytics" class="nav-link" data-route="analytics">Аналитика</a>
              <a href="#reports" class="nav-link" data-route="reports">Отчеты</a>
            </nav>
            <div class="user-avatar">
              <img src="images/user-avatar.png" alt="User Avatar">
            </div>
          </div>
        </div>
      </header>
    `;
  }

  mount() {
    if (this.container) {
      this.container.innerHTML = this.render();
    }
  }
}

