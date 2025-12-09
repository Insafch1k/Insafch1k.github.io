import { 
  mockTransactions, 
  mockBudgets, 
  mockCategories, 
  mockOverview, 
  mockAnalytics, 
  mockReports 
} from '../data/mockData.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MockApi {
  constructor() {
    this.transactions = [...mockTransactions];
    this.budgets = [...mockBudgets];
    this.categories = [...mockCategories];
  }

  async getTransactions(filters = {}) {
    await delay(300);
    
    let filtered = [...this.transactions];
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchLower) ||
        t.categoryName.toLowerCase().includes(searchLower)
      );
    }
    
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filtered;
  }

  async getTransaction(id) {
    await delay(200);
    return this.transactions.find(t => t.id === id) || null;
  }

  async createTransaction(transactionData) {
    await delay(400);
    const newTransaction = {
      id: Date.now(),
      ...transactionData,
      date: transactionData.date || new Date().toISOString().split('T')[0]
    };
    this.transactions.unshift(newTransaction);
    return newTransaction;
  }

  async updateTransaction(id, transactionData) {
    await delay(400);
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Транзакция не найдена');
    
    this.transactions[index] = { ...this.transactions[index], ...transactionData };
    return this.transactions[index];
  }

  async deleteTransaction(id) {
    await delay(300);
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Транзакция не найдена');
    
    this.transactions.splice(index, 1);
    return true;
  }

  async getBudgets() {
    await delay(300);
    return [...this.budgets];
  }

  async getBudget(id) {
    await delay(200);
    return this.budgets.find(b => b.id === id) || null;
  }

  async createBudget(budgetData) {
    await delay(400);
    const newBudget = {
      id: Date.now(),
      ...budgetData,
      spent: budgetData.spent || 0,
      remaining: budgetData.limit - (budgetData.spent || 0)
    };
    this.budgets.push(newBudget);
    return newBudget;
  }

  async updateBudget(id, budgetData) {
    await delay(400);
    const index = this.budgets.findIndex(b => String(b.id) === String(id));
    if (index === -1) throw new Error('Бюджет не найден');
    
    this.budgets[index] = { 
      ...this.budgets[index], 
      ...budgetData,
      remaining: (budgetData.limit || this.budgets[index].limit) - (budgetData.spent || this.budgets[index].spent)
    };
    return this.budgets[index];
  }

  async deleteBudget(id) {
    await delay(300);
    const index = this.budgets.findIndex(b => String(b.id) === String(id));
    if (index === -1) throw new Error('Бюджет не найден');
    
    this.budgets.splice(index, 1);
    return true;
  }

  async getCategories(type = null) {
    await delay(200);
    if (type) {
      return this.categories.filter(c => c.type === type);
    }
    return [...this.categories];
  }

  async getOverview() {
    await delay(400);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = this.transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    
    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const totalBalance = monthlyIncome - monthlyExpenses;
    
    return {
      ...mockOverview,
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      recentTransactions: this.transactions.slice(0, 5)
    };
  }

  async getAnalytics() {
    await delay(400);
    return mockAnalytics;
  }

  async getReports() {
    await delay(400);
    return mockReports;
  }
}

export const mockApi = new MockApi();

