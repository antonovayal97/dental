# Aura Dental — сайт стоматологической клиники

Премиальный production-ready сайт стоматологии на Next.js 16 + Payload CMS 3 + MongoDB.

## Стек

- Next.js 16 (App Router)
- React 19
- TypeScript
- Payload CMS 3 + MongoDB
- Tailwind CSS v4
- Framer Motion, Lucide React
- React Hook Form + Zod + Sonner

## Быстрый старт

### 1. MongoDB

```bash
docker run -d --name mongo-dental -p 27017:27017 mongo:7
```

### 2. Окружение

```bash
cp .env.example .env
```

### 3. Установка и запуск

```bash
npm install
npm run dev
```

- Сайт: http://localhost:3000
- Админка: http://localhost:3000/admin

### 4. Демо-контент и изображения

```bash
npm run generate:images   # создать демо-изображения в public/images
npm run seed              # базовый контент CMS
npm run seed:media        # загрузить фото в Media и привязать к сущностям
```

Создаёт администратора `admin@example.com` (пароль из `SEED_ADMIN_PASSWORD` или `ChangeMe123!`) и заполняет CMS.

> Все телефоны, адреса, отзывы, рейтинги и демо-фото помечены как демонстрационные. Перед продакшеном замените их в админке реальными материалами.

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Разработка |
| `npm run build` | Production-сборка |
| `npm run start` | Запуск сборки |
| `npm run seed` | Заполнение CMS |
| `npm run generate:types` | Типы Payload |
| `npm run generate:importmap` | Import map админки |

## Структура

- `src/app/(frontend)` — публичный сайт
- `src/app/(payload)` — админка и API Payload
- `src/collections` — коллекции CMS
- `src/globals` — глобальные настройки
- `src/components` — UI, секции, формы
- `src/lib/queries` — Local API запросы

## Важно

- Не коммитьте `.env`
- Смените `PAYLOAD_SECRET` и пароль админа перед продакшеном
- Юридические страницы `/privacy` и `/terms` — шаблоны, замените текстами юриста
