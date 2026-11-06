# Гильдия Durotar — сайт гильдии World of Warcraft: Forever

Приветственная (первая) страница гильдейского сайта под **World of Warcraft: Forever** (версия
на основе Classic: уровни 1–60, без мификов): тёмный камень, золото и пергамент в духе игры.
Следующими появятся разделы со составом, расписанием и правилами.

## Стек

- [Astro](https://astro.build) (статическая генерация)
- единственная страница `src/pages/index.astro` со встроенными стилями
- фото подключаются с [Wikimedia Commons](https://commons.wikimedia.org/), шрифты — Google Fonts
- публикация на GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`)

## Локальный запуск

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # сборка в dist/
npm run preview # просмотр собранной версии
npm run check   # проверка типов Astro
```

Новые разделы добавляются как страницы в `src/pages/`.
