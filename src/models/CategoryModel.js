export class CategoryModel {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.icon = data.icon || '';
    this.type = data.type || 'expense';
  }

  getIconPath() {
    return `images/${this.icon}`;
  }

  isValid() {
    return this.id !== '' && this.name !== '';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      type: this.type
    };
  }
}

