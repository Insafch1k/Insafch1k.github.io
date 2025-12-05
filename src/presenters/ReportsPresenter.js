import { ReportsView } from '../views/ReportsView.js';
import { apiService } from '../api/apiService.js';

export class ReportsPresenter {
  constructor() {
    this.view = new ReportsView();
  }

  async loadReports() {
    try {
      const data = await apiService.getReports();
      this.view.updateData(data);
    } catch (error) {
      console.error('Ошибка загрузки отчетов:', error);
    }
  }

  async init() {
    await this.loadReports();
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

