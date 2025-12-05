export const mockTransactions = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Покупки в магазине',
    category: 'food',
    categoryName: 'Продукты',
    amount: -50.00,
    type: 'expense'
  },
  {
    id: 2,
    date: '2024-01-14',
    description: 'Зарплата за декабрь',
    category: 'salary',
    categoryName: 'Зарплата',
    amount: 2500.00,
    type: 'income'
  },
  {
    id: 3,
    date: '2024-01-12',
    description: 'Кино с друзьями',
    category: 'entertainment',
    categoryName: 'Развлечения',
    amount: -30.00,
    type: 'expense'
  },
  {
    id: 4,
    date: '2024-01-10',
    description: 'Покупка одежды',
    category: 'shopping',
    categoryName: 'Одежда',
    amount: -100.00,
    type: 'expense'
  },
  {
    id: 5,
    date: '2024-01-05',
    description: 'Проезд на поезде',
    category: 'transport',
    categoryName: 'Транспорт',
    amount: -20.00,
    type: 'expense'
  },
  {
    id: 6,
    date: '2024-01-20',
    description: 'Обед в ресторане',
    category: 'food',
    categoryName: 'Еда',
    amount: -2500.00,
    type: 'expense'
  },
  {
    id: 7,
    date: '2024-01-19',
    description: 'Поездка на такси',
    category: 'transport',
    categoryName: 'Транспорт',
    amount: -500.00,
    type: 'expense'
  },
  {
    id: 8,
    date: '2024-01-18',
    description: 'Покупка билетов в кино',
    category: 'entertainment',
    categoryName: 'Развлечения',
    amount: -1200.00,
    type: 'expense'
  },
  {
    id: 9,
    date: '2024-01-15',
    description: 'Оплата коммунальных услуг',
    category: 'bills',
    categoryName: 'Счета',
    amount: -4000.00,
    type: 'expense'
  },
  {
    id: 10,
    date: '2024-01-01',
    description: 'Зарплата',
    category: 'salary',
    categoryName: 'Зарплата',
    amount: 50000.00,
    type: 'income'
  }
];

export const mockBudgets = [
  {
    id: 1,
    category: 'food',
    categoryName: 'Продукты',
    limit: 15000,
    spent: 10000,
    remaining: 5000
  },
  {
    id: 2,
    category: 'transport',
    categoryName: 'Транспорт',
    limit: 10000,
    spent: 7000,
    remaining: 3000
  },
  {
    id: 3,
    category: 'entertainment',
    categoryName: 'Развлечения',
    limit: 10000,
    spent: 7500,
    remaining: 2500
  },
  {
    id: 4,
    category: 'home',
    categoryName: 'Дом',
    limit: 10000,
    spent: 8000,
    remaining: 2000
  },
  {
    id: 5,
    category: 'health',
    categoryName: 'Здоровье',
    limit: 5000,
    spent: 4000,
    remaining: 1000
  }
];

export const mockCategories = [
  { id: 'food', name: 'Продукты', icon: 'icon-food.svg', type: 'expense' },
  { id: 'transport', name: 'Транспорт', icon: 'icon-transport.svg', type: 'expense' },
  { id: 'entertainment', name: 'Развлечения', icon: 'icon-entertainment.svg', type: 'expense' },
  { id: 'home', name: 'Дом', icon: 'icon-home.svg', type: 'expense' },
  { id: 'health', name: 'Здоровье', icon: 'icon-health.svg', type: 'expense' },
  { id: 'bills', name: 'Счета', icon: 'icon-filter-bills.svg', type: 'expense' },
  { id: 'shopping', name: 'Одежда', icon: 'icon-filter-all.svg', type: 'expense' },
  { id: 'salary', name: 'Зарплата', icon: 'icon-filter-salary.svg', type: 'income' }
];

export const mockOverview = {
  totalBalance: 12345.67,
  monthlyIncome: 2500.00,
  monthlyExpenses: 1200.00,
  recentTransactions: mockTransactions.slice(0, 5),
  expensesByMonth: [
    { month: 'Июль', amount: 800 },
    { month: 'Август', amount: 950 },
    { month: 'Сентябрь', amount: 1100 },
    { month: 'Октябрь', amount: 1200 },
    { month: 'Ноябрь', amount: 1150 },
    { month: 'Декабрь', amount: 1200 }
  ]
};

export const mockAnalytics = {
  expensesByCategory: [
    { category: 'food', categoryName: 'Еда', amount: 250, percent: 20 },
    { category: 'transport', categoryName: 'Транспорт', amount: 500, percent: 40 },
    { category: 'entertainment', categoryName: 'Развлечения', amount: 680, percent: 54 },
    { category: 'shopping', categoryName: 'Шопинг', amount: 400, percent: 32 },
    { category: 'other', categoryName: 'Другое', amount: 250, percent: 20 }
  ],
  incomeExpenseTrends: {
    total: 3500,
    trend: 10,
    period: 'Последние 6 месяцев',
    data: [
      { month: 'Янв', income: 2500, expense: 1200 },
      { month: 'Фев', income: 2800, expense: 1300 },
      { month: 'Мар', income: 3000, expense: 1400 },
      { month: 'Апр', income: 3200, expense: 1500 },
      { month: 'Май', income: 3500, expense: 1600 },
      { month: 'Июн', income: 3500, expense: 1650 }
    ]
  },
  budgets: [
    { category: 'food', categoryName: 'Еда', limit: 1000, spent: 750, percent: 75 },
    { category: 'transport', categoryName: 'Транспорт', limit: 500, spent: 250, percent: 50 },
    { category: 'entertainment', categoryName: 'Развлечения', limit: 500, spent: 125, percent: 25 },
    { category: 'shopping', categoryName: 'Шопинг', limit: 1000, spent: 900, percent: 90 },
    { category: 'other', categoryName: 'Другое', limit: 500, spent: 50, percent: 10 }
  ]
};

export const mockReports = {
  summary: {
    income: 120000,
    expenses: 80000,
    profit: 40000,
    incomeTrend: 10,
    expensesTrend: -5,
    profitTrend: 15
  },
  trends: {
    period: 'За последний год',
    trend: 10,
    value: 120000,
    data: [
      { month: 'Янв', value: 100000 },
      { month: 'Фев', value: 105000 },
      { month: 'Мар', value: 110000 },
      { month: 'Апр', value: 115000 },
      { month: 'Май', value: 118000 },
      { month: 'Июн', value: 120000 },
      { month: 'Июл', value: 120000 }
    ]
  },
  expensesByCategory: [
    { category: 'food', categoryName: 'Продукты', amount: 30000, percent: 37.5 },
    { category: 'transport', categoryName: 'Транспорт', amount: 15000, percent: 18.75 },
    { category: 'entertainment', categoryName: 'Развлечения', amount: 10000, percent: 12.5 },
    { category: 'home', categoryName: 'Жилье', amount: 20000, percent: 25 },
    { category: 'health', categoryName: 'Здоровье', amount: 5000, percent: 6.25 }
  ]
};

