# Сайт в разработке

Лендинг проекта временно заменён заглушкой: на сайте осталась только одна страница с
надписью «Сайт находится в разработке».

## Стек

- [Astro](https://astro.build) (статическая генерация)
- единственная страница `src/pages/index.astro` со встроенными стилями
- публикация на GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`)

## Локальный запуск

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # сборка в dist/
npm run preview # просмотр собранной версии
```

Когда сайт нужно вернуть, добавляйте новую страницу в `src/pages/` — заглушка
`index.astro` заменяется её содержимым.
