# Быстрый старт - MockAPI.io (2 ресурса)

## Ваш API endpoint
`https://693335a5e5a9e342d2723bf8.mockapi.io`

## Что нужно создать

Создайте **только 2 ресурса** в mockapi.io:

### 1. Ресурс: `transactions`

**Поля:**
- `id` - Object ID (автоматически)
- `date` - String
- `description` - String  
- `category` - String
- `categoryName` - String
- `amount` - Number
- `type` - String ("income" или "expense")

### 2. Ресурс: `budgets`

**Поля:**
- `id` - Object ID (автоматически)
- `category` - String
- `categoryName` - String
- `limit` - Number
- `spent` - Number
- `remaining` - Number

## Что НЕ нужно создавать

- ❌ `categories` - категории хранятся в коде (`src/data/mockData.js`)
- ❌ `overview` - вычисляется из transactions
- ❌ `analytics` - вычисляется из transactions и budgets
- ❌ `reports` - вычисляется из transactions

## Тестовые данные

### Transactions (минимум 5-10 записей):
```json
{
  "date": "2024-01-15",
  "description": "Покупки в магазине",
  "category": "food",
  "categoryName": "Продукты",
  "amount": -50.00,
  "type": "expense"
}
```

### Budgets (минимум 5 записей):
```json
{
  "category": "food",
  "categoryName": "Продукты",
  "limit": 15000,
  "spent": 10000,
  "remaining": 5000
}
```

## Проверка

После создания проверьте:
- `GET https://693335a5e5a9e342d2723bf8.mockapi.io/transactions`
- `GET https://693335a5e5a9e342d2723bf8.mockapi.io/budgets`

Подробная инструкция в `MOCKAPI_RESOURCES.md`

