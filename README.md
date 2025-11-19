# Запуск проекта
docker-compose up --build

# Frontend
http://localhost:8080

## Заполнить таблицу seed-данными
```bash
docker exec -it test-backend-1 npm run seed

# Backend API
http://localhost:3000/items

# Оптимизации
- Индекс по id (PK)
- Пагинация через LIMIT/OFFSET
- Connection pool TypeORM
- Seed 50 000 записей для теста

# Работа с базой данных