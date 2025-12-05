import { OverviewView } from '../views/OverviewView.js';
import { apiService } from '../api/apiService.js';

export class OverviewPresenter {
  constructor() {
    this.view = new OverviewView();
  }

  async init() {
    try {
      const data = await apiService.getOverview();
      
      this.view.updateData(data);
    } catch (error) {
      console.error('Ошибка загрузки данных обзора:', error);
    }
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

