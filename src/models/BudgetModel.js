export class BudgetModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.category = data.category || '';
    this.categoryName = data.categoryName || '';
    this.limit = data.limit || 0;
    this.spent = data.spent || 0;
    this.remaining = data.remaining || this.limit;
  }

  getPercentUsed() {
    if (this.limit === 0) return 0;
    return Math.round((this.spent / this.limit) * 100);
  }

  calculateRemaining() {
    this.remaining = this.limit - this.spent;
    return this.remaining;
  }

  isExceeded() {
    return this.spent > this.limit;
  }

  getFormattedLimit() {
    return `${this.limit.toLocaleString('ru-RU')} ₽`;
  }

  getFormattedSpent() {
    return `${this.spent.toLocaleString('ru-RU')} ₽`;
  }

  getFormattedRemaining() {
    return `${this.remaining.toLocaleString('ru-RU')} ₽`;
  }

  getInfo() {
    return `Осталось ${this.getFormattedRemaining()} из ${this.getFormattedLimit()}`;
  }

  isValid() {
    return this.category !== '' && this.limit > 0;
  }

  toJSON() {
    return {
      id: this.id,
      category: this.category,
      categoryName: this.categoryName,
      limit: this.limit,
      spent: this.spent,
      remaining: this.remaining
    };
  }
}

