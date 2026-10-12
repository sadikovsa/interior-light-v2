# Форма — интерьерный DEMO

Самостоятельный редактируемый пакет из `interior-light-v2` в `sadikovsa/codex_studio`. Перенос сохраняет HTML body, композицию, текст, CSS/JavaScript, изображения, локальные шрифты и GSAP ScrollTrigger byte-for-byte. Изменены только URL метаданных для отдельного репозитория. Корневой исходный checkpoint остаётся совместимым с прежним приватным просмотром.

## Редактирование и сборка

Редактируйте `index.html` и `assets/` в корне пакета; `dist/` — производный каталог публикации. Выполните `python3 build.py` после изменения исходников. Сборка использует стандартную библиотеку Python, без npm, новых зависимостей или сетевых запросов. `BUILD-INVENTORY.json` фиксирует actual public paths/size/SHA256 и равенство исходных/public файлов. Повторная сборка детерминирована.

Локальный просмотр: `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist`, затем `http://127.0.0.1:4173/`. Сервер завершайте после просмотра.

## Публикация

Опубликованный репозиторий: [https://github.com/sadikovsa/interior-light-v2](https://github.com/sadikovsa/interior-light-v2). Рабочий Pages: [https://sadikovsa.github.io/interior-light-v2/](https://sadikovsa.github.io/interior-light-v2/). **Публикация проверена по HTTPS и в Chromium390/1440**, native scroll в обе стороны, функции/noJS/reduced-motion. Все58доступныхHTTPресурса совпадают с проверенным dist по SHA256; `.nojekyll` — Git control, неHTTPasset. [PUBLICATION.json](PUBLICATION.json) хранит точные runtime/source и Pages SHA. Полные proof находятся в `codex_studio/projects/interiors/qa-publication/`.

`main` содержит редактируемые исходники, `DESIGN.md`, `.studio/design.json`, provenance ledgers, checkpoint и inventories. `gh-pages` должен содержать только файлы из `dist/`, с `.nojekyll` в корне. Сборка исключает `.studio`, дизайн/историю/checkpoint/inventories и `provenance.json` из публичного сайта. Локальные лицензии шрифтов и vendor-файлы остаются в `dist/assets/`.

## Смысл и ограничения

Это DEMO вымышленного проекта, AI-изображения подписаны. Сохранён `noindex,follow`, нейтральный WebPage JSON-LD и пустой sitemap: индексация реального бизнеса не заявляется. Меню, фильтры, галерея, FAQ и форма используют локальный JavaScript; форма проверяет поля без отправки/хранения. Юридический маркер — до реального запуска требуется настоящий текст.

Tunnel/Zoom-through управляются нативной обратимой прокруткой; reduced-motion и noJS сохранены. Перенос не является новым браузерным QA, измерением FPS/INP или новым художественным утверждением. Проверки source release описаны в `DESIGN.md`; historical internal paths в provenance/design сохраняют происхождение, не входят в runtime и не нужны для сборки. Новый хостинг проверяется после реального deployment.

`SOURCE-INVENTORY.json` сопоставляет every copied path с оригинальным SHA256. `SOURCE-CHECKPOINT.json` различает исходный release, package и статус публикации; после публикации фактические SHA/URL фиксируются отдельно, без заявления о новом одобрении владельца.
