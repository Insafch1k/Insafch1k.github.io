export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.currentPresenter = null;
  }

  register(route, presenterClass) {
    this.routes.set(route, presenterClass);
  }

  getCurrentRoute() {
    const hash = window.location.hash.slice(1) || 'overview';
    return hash;
  }

  navigate(route) {
    window.location.hash = route;
    this.handleRoute();
  }

  handleRoute() {
    const route = this.getCurrentRoute();
    
    if (this.currentRoute === route) {
      return;
    }

    this.currentRoute = route;
    
    const PresenterClass = this.routes.get(route);
    
    if (!PresenterClass) {
      console.error(`Маршрут "${route}" не найден`);
      return;
    }

    if (this.currentPresenter && typeof this.currentPresenter.destroy === 'function') {
      this.currentPresenter.destroy();
    }

    this.currentPresenter = new PresenterClass();
    this.currentPresenter.render();
  }

  init() {
    this.handleRoute();

    window.addEventListener('hashchange', () => {
      this.handleRoute();
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        this.navigate(route);
      }
    });
  }
}

