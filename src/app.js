import { Router } from './utils/router.js';
import { OverviewPresenter } from './presenters/OverviewPresenter.js';
import { TransactionsPresenter } from './presenters/TransactionsPresenter.js';
import { BudgetsPresenter } from './presenters/BudgetsPresenter.js';
import { AnalyticsPresenter } from './presenters/AnalyticsPresenter.js';
import { ReportsPresenter } from './presenters/ReportsPresenter.js';

class App {
  constructor() {
    this.router = new Router();
    this.init();
  }

  init() {
    this.router.register('overview', OverviewPresenter);
    this.router.register('transactions', TransactionsPresenter);
    this.router.register('budgets', BudgetsPresenter);
    this.router.register('analytics', AnalyticsPresenter);
    this.router.register('reports', ReportsPresenter);

    this.router.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});

