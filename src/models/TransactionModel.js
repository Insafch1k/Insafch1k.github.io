export class TransactionModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.date = data.date || new Date().toISOString().split('T')[0];
    this.description = data.description || '';
    this.category = data.category || '';
    this.categoryName = data.categoryName || '';
    this.amount = data.amount || 0;
    this.type = data.type || 'expense';
  }

  getFormattedAmount() {
    const sign = this.amount >= 0 ? '+' : '';
    return `${sign}${this.amount.toFixed(2)} ₽`;
  }

  getFormattedDate() {
    const date = new Date(this.date);
    const day = date.getDate();
    const month = date.toLocaleString('ru', { month: 'long' });
    return `${day} ${month}`;
  }

  isValid() {
    return this.description.trim() !== '' && 
           this.category !== '' && 
           this.amount !== 0;
  }

  toJSON() {
    return {
      id: this.id,
      date: this.date,
      description: this.description,
      category: this.category,
      categoryName: this.categoryName,
      amount: this.amount,
      type: this.type
    };
  }
}

