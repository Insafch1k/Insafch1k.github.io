# Личный финансовый учёт

Приложение для управления личными финансами, построенное на архитектуре MVP (Model-View-Presenter).

## Структура проекта

```
├── src/
│   ├── components/      # Переиспользуемые компоненты UI
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── TransactionCard.js
│   │   └── BudgetCard.js
│   ├── views/          # View классы для каждой страницы
│   │   ├── OverviewView.js
│   │   ├── TransactionsView.js
│   │   ├── BudgetsView.js
│   │   ├── AnalyticsView.js
│   │   └── ReportsView.js
│   ├── models/         # Модели данных
│   │   ├── TransactionModel.js
│   │   ├── BudgetModel.js
│   │   └── CategoryModel.js
│   ├── presenters/      # Presenter классы (бизнес-логика)
│   │   ├── OverviewPresenter.js
│   │   ├── TransactionsPresenter.js
│   │   ├── BudgetsPresenter.js
│   │   ├── AnalyticsPresenter.js
│   │   └── ReportsPresenter.js
│   ├── api/            # API сервисы
│   │   └── mockApi.js
│   ├── data/           # Моковые данные
│   │   └── mockData.js
│   ├── utils/          # Утилиты
│   │   ├── router.js
│   │   └── formatters.js
│   └── app.js          # Главный файл приложения
├── index.html          # Главная HTML страница
└── images/             # Изображения и иконки
```

## Архитектура

Проект использует паттерн **MVP (Model-View-Presenter)**:

- **Model** - классы данных (TransactionModel, BudgetModel и т.д.)
- **View** - классы для отображения UI (OverviewView, TransactionsView и т.д.)
- **Presenter** - классы, связывающие View и Model, содержат бизнес-логику

## Функциональность

### 1. Обзор (Overview)
- Отображение общего баланса
- Ежемесячный доход и расходы
- График тенденций расходов
- Последние транзакции

### 2. Транзакции (Transactions)
- Список всех транзакций
- Поиск по транзакциям
- Фильтрация по категориям
- Добавление новых транзакций (TODO)

### 3. Бюджеты (Budgets)
- Общий бюджет на месяц
- Бюджеты по категориям
- Отображение оставшихся средств

### 4. Аналитика (Analytics)
- Расходы по категориям (график)
- Тенденции доходов и расходов
- Прогресс по бюджетам

### 5. Отчеты (Reports)
- Сводка доходов и расходов
- Графики тенденций
- Детальная таблица по категориям

## Запуск

1. Откройте `index.html` в браузере
2. Или используйте локальный сервер:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

## Технологии

- Vanilla JavaScript (ES6+ модули)
- HTML5 / CSS3
- Архитектура MVP

## Mock API

Приложение использует Mock API (`src/api/mockApi.js`) для имитации работы с сервером. Все данные хранятся в памяти и имитируют задержки сети.

## Дальнейшее развитие

- [ ] Добавление модальных окон для создания/редактирования транзакций
- [ ] Добавление модальных окон для создания/редактирования бюджетов
- [ ] Реализация реального API
- [ ] Добавление валидации форм
- [ ] Добавление уведомлений
- [ ] Экспорт данных в CSV/PDF

