# Настройка MockAPI.io

## Шаг 1: Создание проекта на mockapi.io

1. Перейдите на https://mockapi.io/
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новый проект
4. Скопируйте URL вашего проекта (например: `https://1234567890abcdef.mockapi.io/api/v1`)

## Шаг 2: Создание ресурсов (Resources)

В вашем проекте на mockapi.io создайте следующие ресурсы:

### 1. Transactions (Транзакции)

- **Name**: `transactions`
- **Fields**:
  - `id` (String, auto-generated)
  - `date` (String) - дата транзакции
  - `description` (String) - описание
  - `category` (String) - категория (food, transport, entertainment, etc.)
  - `categoryName` (String) - название категории
  - `amount` (Number) - сумма
  - `type` (String) - тип: "income" или "expense"

### 2. Budgets (Бюджеты)

- **Name**: `budgets`
- **Fields**:
  - `id` (String, auto-generated)
  - `category` (String) - категория
  - `categoryName` (String) - название категории
  - `limit` (Number) - лимит бюджета
  - `spent` (Number) - потрачено
  - `remaining` (Number) - осталось

### 3. Categories (Категории)

- **Name**: `categories`
- **Fields**:
  - `id` (String) - идентификатор категории
  - `name` (String) - название
  - `icon` (String) - имя файла иконки
  - `type` (String) - тип: "income" или "expense"

### 4. Overview (Обзор)

- **Name**: `overview`
- **Fields**:
  - `id` (String, auto-generated)
  - `totalBalance` (Number)
  - `monthlyIncome` (Number)
  - `monthlyExpenses` (Number)
  - `recentTransactions` (Array) - массив ID транзакций

### 5. Analytics (Аналитика)

- **Name**: `analytics`
- **Fields**:
  - `id` (String, auto-generated)
  - `expensesByCategory` (Array) - массив объектов
  - `incomeExpenseTrends` (Object)
  - `budgets` (Array) - массив объектов

### 6. Reports (Отчеты)

- **Name**: `reports`
- **Fields**:
  - `id` (String, auto-generated)
  - `summary` (Object)
  - `trends` (Object)
  - `expensesByCategory` (Array)

## Шаг 3: Заполнение данных

После создания ресурсов, добавьте тестовые данные через интерфейс mockapi.io или используйте API для создания записей.

### Пример данных для Transactions:

```json
{
  "date": "2024-01-15",
  "description": "Покупки в магазине",
  "category": "food",
  "categoryName": "Продукты",
  "amount": -50.0,
  "type": "expense"
}
```

### Пример данных для Budgets:

```json
{
  "category": "food",
  "categoryName": "Продукты",
  "limit": 15000,
  "spent": 10000,
  "remaining": 5000
}
```

## Шаг 4: Обновление конфигурации

1. Откройте файл `src/config/apiConfig.js`
2. Замените `YOUR_PROJECT_ID` на ID вашего проекта из mockapi.io
3. Установите `USE_MOCK_API = false` для использования реального API

Пример:

```javascript
export const API_BASE_URL = "https://1234567890abcdef.mockapi.io";
export const USE_MOCK_API = false;
```

**Важно:**

- Если ваш URL содержит `/api/v1`, используйте полный URL
- Если нет, используйте базовый URL без `/api/v1`
- MockAPI.io автоматически создает endpoints вида `/resource_name`

## Шаг 5: Тестирование

После настройки, откройте приложение и проверьте, что данные загружаются с mockapi.io.

## Примечания

- MockAPI.io автоматически создает CRUD endpoints для каждого ресурса
- GET запросы поддерживают фильтрацию через query параметры
- Для сложных запросов (overview, analytics, reports) может потребоваться создание кастомных endpoints или обработка на клиенте
