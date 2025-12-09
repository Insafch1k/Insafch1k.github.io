import { API_BASE_URL, USE_MOCK_API } from '../config/apiConfig.js';
import { mockApi } from './mockApi.js';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    if (USE_MOCK_API) {
      return this.mockRequest(endpoint, options);
    }

    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${this.baseURL}${endpoint}`;
    
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    if (options.body && (config.method === 'POST' || config.method === 'PUT')) {
      config.body = options.body;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (config.method === 'DELETE') {
        return { success: true };
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async mockRequest(endpoint, options) {
    await delay(300);
    
    const method = options.method || 'GET';
    const path = endpoint.split('/').filter(p => p);
    
    if (path[0] === 'transactions') {
      if (method === 'GET') {
        const filters = this.parseQueryString(endpoint);
        return await mockApi.getTransactions(filters);
      } else if (method === 'POST') {
        return await mockApi.createTransaction(options.body);
      } else if (method === 'PUT') {
        const id = path[1];
        return await mockApi.updateTransaction(parseInt(id), options.body);
      } else if (method === 'DELETE') {
        const id = path[1];
        return await mockApi.deleteTransaction(parseInt(id));
      }
    } else if (path[0] === 'budgets') {
      if (method === 'GET') {
        return await mockApi.getBudgets();
      } else if (method === 'POST') {
        return await mockApi.createBudget(options.body);
      } else if (method === 'PUT') {
        const id = path[1];
        return await mockApi.updateBudget(id, options.body);
      } else if (method === 'DELETE') {
        const id = path[1];
        return await mockApi.deleteBudget(id);
      }
    } else if (path[0] === 'categories') {
      const { mockCategories } = await import('../data/mockData.js');
      return mockCategories;
    } else if (path[0] === 'overview') {
      return await mockApi.getOverview();
    } else if (path[0] === 'analytics') {
      return await mockApi.getAnalytics();
    } else if (path[0] === 'reports') {
      return await mockApi.getReports();
    }
    
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }

  parseQueryString(endpoint) {
    const queryString = endpoint.split('?')[1];
    if (!queryString) return {};
    
    const params = {};
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
  }

  async getTransactions(filters = {}) {
    let endpoint = '/transactions';
    const queryParams = [];
    
    if (filters.category && filters.category !== 'all') {
      queryParams.push(`category=${encodeURIComponent(filters.category)}`);
    }
    
    if (filters.search) {
      queryParams.push(`search=${encodeURIComponent(filters.search)}`);
    }
    
    if (queryParams.length > 0) {
      endpoint += '?' + queryParams.join('&');
    }
    
    return await this.request(endpoint);
  }

  async getTransaction(id) {
    return await this.request(`/transactions/${id}`);
  }

  async createTransaction(transactionData) {
    const response = await this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    });
    return response;
  }

  async updateTransaction(id, transactionData) {
    const response = await this.request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData)
    });
    return response;
  }

  async deleteTransaction(id) {
    return await this.request(`/transactions/${id}`, {
      method: 'DELETE'
    });
  }

  async getBudgets() {
    return await this.request('/budgets');
  }

  async getBudget(id) {
    return await this.request(`/budgets/${id}`);
  }

  async createBudget(budgetData) {
    const response = await this.request('/budgets', {
      method: 'POST',
      body: JSON.stringify(budgetData)
    });
    return response;
  }

  async updateBudget(id, budgetData) {
    const safeId = encodeURIComponent(id);
    const response = await this.request(`/budgets/${safeId}`, {
      method: 'PUT',
      body: JSON.stringify(budgetData)
    });
    return response;
  }

  async deleteBudget(id) {
    return await this.request(`/budgets/${id}`, {
      method: 'DELETE'
    });
  }

  async getCategories(type = null) {
    const { mockCategories } = await import('../data/mockData.js');
    
    if (type) {
      return mockCategories.filter(c => c.type === type);
    }
    
    return mockCategories;
  }

  async getOverview() {
    try {
      const transactions = await this.getTransactions();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyTransactions = transactions.filter(t => {
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
      
      const expensesByMonth = this.calculateExpensesByMonth(transactions);
      
      return {
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        recentTransactions: transactions.slice(0, 5),
        expensesByMonth
      };
    } catch (error) {
      console.error('Error calculating overview:', error);
      throw error;
    }
  }

  async getAnalytics() {
    try {
      const [transactions, budgets] = await Promise.all([
        this.getTransactions(),
        this.getBudgets()
      ]);
      
      const expensesByCategory = this.calculateExpensesByCategory(transactions);
      
      const incomeExpenseTrends = this.calculateIncomeExpenseTrends(transactions);
      
      const budgetsWithPercent = budgets.map(b => ({
        ...b,
        percent: Math.round((b.spent / b.limit) * 100)
      }));
      
      return {
        expensesByCategory,
        incomeExpenseTrends,
        budgets: budgetsWithPercent
      };
    } catch (error) {
      console.error('Error calculating analytics:', error);
      throw error;
    }
  }

  async getReports() {
    try {
      const transactions = await this.getTransactions();
      
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const profit = income - expenses;
      
      const incomeTrend = 10;
      const expensesTrend = -5;
      const profitTrend = 15;
      
      const expensesByCategory = this.calculateExpensesByCategory(transactions);
      
      const trends = this.calculateTrends(transactions);
      
      return {
        summary: {
          income,
          expenses,
          profit,
          incomeTrend,
          expensesTrend,
          profitTrend
        },
        trends,
        expensesByCategory
      };
    } catch (error) {
      console.error('Error calculating reports:', error);
      throw error;
    }
  }

  calculateExpensesByMonth(transactions) {
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    const expensesByMonth = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        if (!expensesByMonth[monthKey]) {
          expensesByMonth[monthKey] = { month: monthNames[date.getMonth()], amount: 0 };
        }
        expensesByMonth[monthKey].amount += Math.abs(t.amount);
      });
    
    return Object.values(expensesByMonth).slice(-6);
  }

  calculateExpensesByCategory(transactions) {
    const categoryMap = {};
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    expenses.forEach(t => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = {
          category: t.category,
          categoryName: t.categoryName,
          amount: 0,
          percent: 0
        };
      }
      categoryMap[t.category].amount += Math.abs(t.amount);
    });
    
    Object.values(categoryMap).forEach(item => {
      item.percent = total > 0 ? Math.round((item.amount / total) * 100) : 0;
    });
    
    return Object.values(categoryMap);
  }

  calculateIncomeExpenseTrends(transactions) {
    const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
    const data = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return `${tDate.getFullYear()}-${tDate.getMonth()}` === monthKey;
      });
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      data.push({
        month: monthNames[5 - i],
        income,
        expense
      });
    }
    
    const total = data.reduce((sum, d) => sum + d.income - d.expense, 0);
    
    return {
      total,
      trend: 10, // Можно вычислить реальный тренд
      period: 'Последние 6 месяцев',
      data
    };
  }

  calculateTrends(transactions) {
    const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return `${tDate.getFullYear()}-${tDate.getMonth()}` === monthKey;
      });
      
      const value = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      data.push({
        month: monthNames[6 - i],
        value
      });
    }
    
    return {
      period: 'За последний год',
      trend: 10,
      value: data[data.length - 1]?.value || 0,
      data
    };
  }
}

export const apiService = new ApiService();

