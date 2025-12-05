# Настройка ресурсов в MockAPI.io

Ваш API endpoint: `https://693335a5e5a9e342d2723bf8.mockapi.io`

## Ресурсы для создания

Вам нужно создать **только 2 основных ресурса** в mockapi.io:

> **Важно:** 
> - Ресурсы `overview`, `analytics` и `reports` создавать НЕ нужно - они будут вычисляться автоматически из `transactions` и `budgets` на клиенте.
> - Ресурс `categories` тоже НЕ нужен - категории хранятся как статические данные в коде приложения.

---

## 1. Ресурс: `transactions` (Транзакции)

### Schema (Поля):

| Field Name | Type | Value/Options |
|------------|------|---------------|
| `id` | Object ID | (автоматически) |
| `date` | String | Faker.js → `date.recent` или просто текст |
| `description` | String | Faker.js → `lorem.sentence` |
| `category` | String | Faker.js → `random.arrayElement(['food', 'transport', 'entertainment', 'home', 'health', 'bills', 'shopping', 'salary'])` |
| `categoryName` | String | Faker.js → `random.arrayElement(['Продукты', 'Транспорт', 'Развлечения', 'Дом', 'Здоровье', 'Счета', 'Одежда', 'Зарплата'])` |
| `amount` | Number | Faker.js → `number.float({ min: -10000, max: 100000, precision: 0.01 })` |
| `type` | String | Faker.js → `random.arrayElement(['income', 'expense'])` |

### Пример данных для ручного добавления:
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

---

## 2. Ресурс: `budgets` (Бюджеты)

### Schema (Поля):

| Field Name | Type | Value/Options |
|------------|------|---------------|
| `id` | Object ID | (автоматически) |
| `category` | String | Faker.js → `random.arrayElement(['food', 'transport', 'entertainment', 'home', 'health'])` |
| `categoryName` | String | Faker.js → `random.arrayElement(['Продукты', 'Транспорт', 'Развлечения', 'Дом', 'Здоровье'])` |
| `limit` | Number | Faker.js → `number.int({ min: 5000, max: 20000 })` |
| `spent` | Number | Faker.js → `number.int({ min: 0, max: 15000 })` |
| `remaining` | Number | Faker.js → `number.int({ min: 0, max: 10000 })` |

### Пример данных для ручного добавления:
```json
{
  "category": "food",
  "categoryName": "Продукты",
  "limit": 15000,
  "spent": 10000,
  "remaining": 5000
}
```

---

## Пошаговая инструкция создания

### Шаг 1: Создание ресурса `transactions`

1. Нажмите кнопку **"+ Add Resource"** или **"NEW RESOURCE"**
2. В поле **Resource name** введите: `transactions`
3. В разделе **Schema** добавьте поля:
   - Нажмите **"+"** для добавления поля
   - Добавьте каждое поле из таблицы выше
   - Для полей с Faker.js выберите тип и настройте генератор
4. Нажмите **"Create"** или **"Save"**

### Шаг 2: Создание ресурса `budgets`

1. Повторите шаги из Шага 1
2. Resource name: `budgets`
3. Добавьте поля из таблицы для budgets

### Шаг 3: Заполнение тестовыми данными

После создания ресурсов, добавьте несколько тестовых записей:

#### Для transactions (минимум 5-10 записей):
```json
[
  {
    "date": "2024-01-15",
    "description": "Покупки в магазине",
    "category": "food",
    "categoryName": "Продукты",
    "amount": -50.00,
    "type": "expense"
  },
  {
    "date": "2024-01-14",
    "description": "Зарплата за декабрь",
    "category": "salary",
    "categoryName": "Зарплата",
    "amount": 2500.00,
    "type": "income"
  },
  {
    "date": "2024-01-12",
    "description": "Кино с друзьями",
    "category": "entertainment",
    "categoryName": "Развлечения",
    "amount": -30.00,
    "type": "expense"
  }
]
```

#### Для budgets (минимум 5 записей):
```json
[
  {
    "category": "food",
    "categoryName": "Продукты",
    "limit": 15000,
    "spent": 10000,
    "remaining": 5000
  },
  {
    "category": "transport",
    "categoryName": "Транспорт",
    "limit": 10000,
    "spent": 7000,
    "remaining": 3000
  },
  {
    "category": "entertainment",
    "categoryName": "Развлечения",
    "limit": 10000,
    "spent": 7500,
    "remaining": 2500
  }
]
```

---

> **Примечание:** Категории (`categories`) не нужно создавать в mockapi.io - они хранятся как статические данные в файле `src/data/mockData.js` и используются напрямую в приложении.

---

## Проверка работы

После создания ресурсов и добавления данных, проверьте endpoints:

- `GET https://693335a5e5a9e342d2723bf8.mockapi.io/transactions`
- `GET https://693335a5e5a9e342d2723bf8.mockapi.io/budgets`

---

## Примечания

1. **Overview, Analytics, Reports** - эти данные будут вычисляться на клиенте из transactions и budgets, отдельные ресурсы для них не нужны.

2. **Фильтрация** - MockAPI.io автоматически поддерживает фильтрацию через query параметры:
   - `GET /transactions?category=food`
   - `GET /transactions?type=expense`

3. **Сортировка** - Можно использовать параметр `sortBy`:
   - `GET /transactions?sortBy=date&order=desc`

4. **Поиск** - Для поиска можно использовать фильтрацию или обрабатывать на клиенте.

