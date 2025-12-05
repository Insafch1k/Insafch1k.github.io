import { AnalyticsView } from '../views/AnalyticsView.js';
import { apiService } from '../api/apiService.js';

export class AnalyticsPresenter {
  constructor() {
    this.view = new AnalyticsView();
  }

  async loadAnalytics() {
    try {
      const data = await apiService.getAnalytics();
      this.view.updateData(data);
    } catch (error) {
      console.error('Ошибка загрузки аналитики:', error);
    }
  }

  async init() {
    await this.loadAnalytics();
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

