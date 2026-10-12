# Форма / Object — фактическая дизайн-система

Оглавление: 1. Scope; 2. Типографика и цвет; 3. Главы и сетка; 4. Сцена; 5. Интерфейсы; 6. Публичные тексты/SEO; 7. Проверки; 8. Токены.

## 1. Scope

Предметный каталог. Статичные HTML/CSS/vanilla JS; actual active source документирован 12 октября 2026. Сохранены принятые композиции hero, нижние системы, H1/H2, изображения, шрифты, геометрия и пространственный GSAP driver. Корневые snapshots синхронизирует диспетчер; этот документ относится к `projects/interiors/interior-light-v2/`.

Новый прямой запрос владельца разрешил убрать публичные AI/DEMO-подписи и технические заглушки. Это scoped override старой обязанности видимой маркировки только для трёх active v2 и comparison. Внутренние provenance/исторические отчёты сохранены; концепции не представлены завершёнными заказами реальных клиентов. Даты/контакты/отзывы/награды/юридические утверждения не придуманы.

Текущий public-runtime inventory SHA256 `23fc7e4f83ed58b84ee1901c7513ae036d1f3ab8956687f71033a0dea5b1ecc3`; метод и source/build inventories — в SOURCE-CHECKPOINT.json. Исторический175-input hash `7a619e74dbb829cb788c252ca954495ff9fcc97126aa7fac7cf89b230bf26a72` относится к прежнему fullSEO/QA и не описывает новую HTML/form/SVG редактуру. DESIGN/design.json — non-runtime документы, исключённые из public dist.

Сохранённая QA-коррекция11октября: BUG-QA-03: только media(max-width:359px), f-set minmax(0,1fr), child min-width:0 и H2clamp(1.75rem,8.75vw,2rem)=28px при320. Колонка номеров56px + gap16px/padding72px сохранена. Новая редактура не меняет её pixels/таймлайн. Старые first-generation варианты и архивы не правились.

## 2. Типографика и цвет

Hero heading `Arial, system-ui, sans-serif`, body `Arial, system-ui, sans-serif`. Ниже — **Unbounded + Golos Text**: H2weight700/line1.04/tracking-0.04em/max-width26ch; H3body60020px/1.3, prose≤65ch. Локальные declaredfont-face ranges: {"Golos Text": {"weight_range": "400 600", "font_display": "swap", "subsets": ["cyrillic-ext", "cyrillic", "latin"], "css": "assets/fonts/golostext.css"}, "Unbounded": {"weight_range": "400 700", "font_display": "swap", "subsets": ["cyrillic-ext", "cyrillic", "latin"], "css": "assets/fonts/unbounded.css"}}. Используются Unbounded 700 и Golos Text 400–600; variable face range не означает применение всех весов. Два семейства×три subsetWOFF2, шесть файлов/две OFL на вариант, font-display:swap, CDN нет.

Основная нижняя палитра: {"background": "#edede7", "text": "#191b1a", "muted": "#725037", "accent": "#3f4668"}. Остальные светлые/indigo/warm tokens — в `.studio/design.json`, извлечены из CSS, а не заменяют hero palette.

Mobile lower body17px/1.5/caption14/H232; ≥768 body18/caption15/H242; ≥1200 body20/H264. 

## 3. Девять глав и layout

1. Атлас сочетаний
2. Один силуэт — разные опоры
3. Предмет меняет пространство
4. Проверка в масштабе комнаты
5. Тёплая грань
6. Малая коллекция для дома
7. От композиции к комплекту
8. Вопросы к выбору
9. Опишите композицию комнаты

Это семь содержательных глав, два развёрнутых интерьерных концепта, FAQ4 и форма. Mobilechapter padding32px20px/gap20; tablet≥76840px32px/gap24; desktop≥120056px `max(64px,calc((100vw - 1312px)/2))`/gap32. Нижний gutter самостоятелен от глобального 80rem. Scroll-margin-top7rem; mobile одно/локальныепарные grid, tablet две и desktop асимметричныеполосы.

| Desktop≥1200 блок | Колонки |
|---|---|
| `.f-atlas` | `40fr 32fr 28fr` |
| `.f-supports` | `38fr 62fr` |
| `.f-room` | `68fr 32fr` |
| `.f-placement` | `1fr 1fr` |
| `.f-bedroom` | `34fr 24fr 42fr` |
| `.f-objects` | `38fr 24fr 38fr` |
| `.f-set` | `44fr 56fr` |

Атлас≥768:1.2fr1fr.85fr/gap20px, второй образец поднят на 45px; desktopgap40px/offsets70 и 20px, H2 атласа 84px/17ch. Indigo#3f4668/#edede7 и warm#d3c6b3/#191b1a/muted#513c2d меняют ритм главы. Крупное OBJECT отдельно от H1; H1clamp(2rem,2.25vw,3rem); desktophero bottom3rem. Коллекция различает столик 4/5, свет 3/5, поднос 4/5.

Фото в `.r3-media` defaultaspect3/2/object-fit:cover; отдельные портреты/детали имеют собственные proportions/object-position/static-scale. SVG схемы contain4/3, bench-node2/3. Полный master открывается по обычной gallerylink; crop не scroll-анимация. Lazy/async decode, srcset и width/height сохранены; caption/alt теперь содержат обычные описания без публичных AI/DEMO-пометок. Внутренний provenance-ledger не удалять.

## 4. Tunnel / Zoom-through

Local GSAP/ScrollTrigger3.13.0 в `assets/js/vendor/`; `main.js` владеет scene/menu. Native scroll, один обратимый driverp0…1, pin `.scene-stage`/scrub:true/starttop top/invalidateOnRefresh/anticipatePin1. Backdrop/farplane3 имеют world scale; отдельно вырезанные plane1/2 ускоряются после выхода архитектурных силуэтов, затем открывается destination комната. Нет wheelhijack.

Ось: x=0.5364832535885168, y=0.563230605738576. World scale `1+(18-1)*clamp(p/.94)^2`; near1 start0.46/multiplier`1+2*clamp((p-start)/(1-start))`; near2 start0.74/`1+1.4*…`. Camera travel к p.64; endX=−(axisX−.5)*canvasWidth/endY=−(axisY−.5)*canvasHeight. Mobile≤600startX=endX+stageWidth*.025, desktop0. Destination1…1.12 к p.94; hero UI fade.05….21, hero.inertp>.22. Scroll range 2viewportdesktop/1.3mobile≤600.

Canvasmax(100vw,177.683svh)×max(100svh,56.28vw), центр translate(−50%,−50%). Stage100svh/min-height36rem, ≤60033rem. Image-load/filtersrefresh триггеров. ReducedmatchMediacleanup снимает pin/transforms/opacity, inert=false; transitionsinstant. NoJS статичная architecture+destinationfallback и полныйконтент. Эти фазы относятся к фактической геометрии, не универсальный preset.

## 5. Интерфейсы и локальное описание

Сохранённые menu/filter/gallery/FAQ handlers до form block byte-identical с исходным checkpoint. Menu<768: aria-expanded/Escape/focus restore,280msheight/opacity/reduced0. Controls≥44px, поля/основная кнопка≥52px; ссылки без подчёркивания, focusoutline3px/offset4px. Фильтры aria-pressed/count, два проекта; firstcasechapter сfilter остаётся доступной для#projects→Все; после изменения высоты ScrollTrigger.refresh. NoJSвсе проекты видны, filterdisabled.

Gallery16ссылок: native dialog; requested отдельно от displayedactive; nativeImage.decode + generation/dialog.open guard применяет image/alt/caption/counter одним завершённым выбором. Ошибка сохраняет lastgood/resetrequested/status. Closeinvalidate и guard delayedclose при reopen; Arrowkeys/Tabtrap/nativeEscape/focusrestore/swipe>|48|px. Dialogwidthmin(1200px,100vw−32px)/max94dvh; imagecontainmax70dvh; ≤600width100vw−20px/image54dvh. NoJSпрямые ссылки работают. FAQ4 native detailsopen; JSWAAPIheight/opacity280ms/cubic-bezier(.22,1,.36,1), cancel/reverse от текущего состояния; reducedinstant/noJSopen.

**Новая форма** готовит описание, не отправляет заявку. Typebutton «Подготовить описание»; прежняя trim/name/message и email/phone7–15digits validation сохранена. Inlineerrors/aria-invalid/firstinvalidfocus; submitpreventDefault. После успеха появляется editabletextarea «Подготовленное описание» и «Скопировать», «Сохранить TXT», «Выделить текст». Шаблон `Композиция комнаты — Форма` содержит имя/контакт/исходноеописание; пользователь может переписать получившийся текст.

Экспорт берёт **текущее edited textarea.value**, а не исходные поля/кеш. Clipboardуспех только после fulfilledwriteText; rejection/недоступность дают инструкцию и focus/select для ручного копирования. generation/exportRequest/visibility/currentvalue guard не применяет устаревший asyncstatus после правок/регенерации/нового экспорта. Пробельный текст не копируется/не скачивается. Изменение исходных полей скрывает и очищает draft; его правки очищают exportstatus. НетPOST/network/backend/localStorage/sessionStorage. NoJSdisabledpreparation+«Чтобы подготовить описание, включите JavaScript».

TXT: Blobtext/plain;charset=utf-8 по явному нажатию, temporaryanchor/downloadfilename `forma-interior-brief.txt`, anchorremove/revokeObjectURL через1000ms. Success «TXT-файл передан браузеру для сохранения» не утверждает сохранение на устройстве. Heightchangesrefresh/restore scrollY instant; лишних refresh при повторных скрытых пустых input нет.

Добавлены только четыре scopedCSSправила: visiblebriefgrid/gap20px, briefH3margin-bottom0, flexactionswrap/gap12px, cleanfooter navgrid-column1/-1. Цвета/семейства/controlstyles наследуются от прежней темы; новый общий stylekit/таймлайн не добавлен. Footer —профиль и три работающихanchors.

## 6. Публичные тексты и SEO

Маркировки AI/DEMO/«демонстрационные данные», публичная provenance-памятка, блок подготовки к запуску и legalplaceholder удалены по явному запросу. Caption/alt/aria/embeddedJSON/meta/manifest/SVGtitle имеют обычные описания; нейроизображения не названы фотографиями выполненных заказов. Содержательные cautions о замерах, материале, устойчивости и узлах сохранены. SVGизменяют только восемь titleстрок по трём пакетам; геометрия/ledger сохранились.

Title: «Форма — дизайн интерьера и предметные композиции». Canonical `https://sadikovsa.github.io/interior-light-v2/`. OG/Twitter/WebPageJSONLD/localicons/manifest, robots и намеренный `noindex,follow` сохранены. Отсутствие публичных пометок не означает фактологически подтверждённый коммерческий запуск; индексация/юридические данные/backend требуют отдельного scope. Не появился ложный Organization/LocalBusiness/review/реальный контакт.

Три standalonePages уже существуют. Редактура12октября republish выполняется диспетчером после checks с отдельными source/pagesSHA и actualHTTP/browserproof; прежний API403 —исторический статус одного App, не текущий globalblocker. Существующий liveURL не доказывает загрузку новой редакции. PrivateSites обновляется отдельно, его sourceSHA отличается от GitHubSHA.

## 7. Доказательства и границы

Новая редактура: [запрос](../../../work/interior-cleanup/00-request.md), [copy](../../../work/interior-cleanup/02-copy.md), [buildnotes](../../../work/interior-cleanup/03-build-notes.md), [статическиеchecks](../../../work/interior-cleanup/static-result.json). Localrefs/uniqueIDs/JSON/XML/noindex, source/dist/deterministicbuild PASS; semanticpublicmarkers0. Staticfrozen geometry/H1/H2/raster/fonts/icons/vendor/main.js, SVGgeometry и CSS/JSunaffectedprefix подтверждены. HTMLbody/SVGtitles/formruntime изменены —не body/allassets byte-identical.

[Текущий focused QA](../../../work/interior-cleanup/05-qa-report.md): **QA_PASS_WITH_NOTES**, BLOCKER0/MAJOR0/MINOR0. Chromium151/Linux:12fresh normal contexts (3×320×844/390×844/768×900/1440×900) и3noJS+3reduced390×844. Все прошли native wheel через9глав и обратноY0 без горизонтальногоoverflow/markers;6functionalflows390/1440 проверили меню/filter/gallery/FAQ и новую форму. Source/dist bytes и frozenbaseline paths проверены отдельно; новый body/SVGtitles/form не называются byte-identical.

Настоящие clipboardwrite/read и TXTdownload/saveAs/readUTF8 в6flows совпали с текущим editedtextarea.value, включая Unicode/newline/emoji. Clipboardpermissions granted тестом. ControlledNotAllowedError дал focus/select и ручную инструкцию; пробельный draft не экспортировался. Два heldpromise race на каждомflow проверили edit и originalinput→regen без stalestatus. Изменение исходного поля инвалидировало output; Enter не навигировал, nonGET0/storageunchanged. Кнопка «Выделить текст» отдельно **НЕ ПРОВЕРЕНА**; общий selectText реально выполнен clipboardfailure-веткой. Exportasync races отдельно в reducedcontext не повторялись.

Fresh48normalPNG+6fallbackPNG; QA реально открыл три кадра, независимый reviewer выполняется отдельно. [Rawresults](../../../work/interior-cleanup/qa/hosting-regression.json) и [readonlychecks](../../../work/interior-cleanup/qa/static-readonly.json). Documenter не запускал browser и не выдаёт сохранённые screenshots за собственное художественное review. Новые motionrecordings выполняет QA отдельно; dimensions/duration manifest и actualpublicationproof фиксирует root. Старый validation-only PASS не доказывал новый editable/exportworkflow.

FullSEO/QA11октября остаются историческими: targetedbugfixes/nativewheel/review и изолированныеLH относятся к предыдущему artifact, reuse только неизменённых contracts. Нового LH/fullQA/FPS/fieldINP не запускали; прежний mobileLCP4.5–5.95s остаётся историческим ограничением, не измерением этой редакции. TBTнеINP/A100неполныйWCAG. Crossbrowser/physicalphones/screenreaders/OSIME/toolbarzoom/allmotioncontrast/FPS/fieldCWV/INP НЕ ПРОВЕРЕНО этим focusedrelease.

Новая publicationverification/reviewer делается root отдельными доказательствами. Source/build/checkpoint inventories и provenance сохраняются внутри пакетов/history; publicdist исключает внутренние instructions/reports.

## 8. Глобальные tokens фактического hero

| CSStoken | Значение |
|---|---|
| `--color-bg` | `#F7F7F4` |
| `--color-text` | `#171918` |
| `--color-muted` | `#545A54` |
| `--color-accent` | `#715338` |
| `--color-surface` | `#E8E8E2` |
| `--color-on-accent` | `#FFFFFF` |
| `--color-error` | `#8F2431` |
| `--color-focus` | `#715338` |
| `--color-hero-text` | `#171918` |
| `--color-hero-scrim` | `rgba(247,247,244,0.92)` |
| `--font-heading` | `Arial, system-ui, sans-serif` |
| `--font-body` | `Arial, system-ui, sans-serif` |
| `--font-size-caption` | `0.8125rem` |
| `--font-size-body` | `1rem` |
| `--font-size-lead` | `1.25rem` |
| `--font-size-h2` | `clamp(2rem, 4vw, 3.75rem)` |
| `--font-size-hero` | `clamp(2.25rem, 4.4vw, 4.5rem)` |
| `--font-size-object` | `clamp(5rem, 22vw, 22rem)` |
| `--line-body` | `1.6` |
| `--line-heading` | `1.08` |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `1rem` |
| `--space-4` | `1.5rem` |
| `--space-5` | `2rem` |
| `--space-6` | `3rem` |
| `--space-7` | `5rem` |
| `--space-section` | `clamp(4rem, 8vw, 8rem)` |
| `--page-gutter` | `clamp(1.25rem, 4vw, 4rem)` |
| `--content-width` | `80rem` |
| `--radius-control` | `0px` |
| `--radius-panel` | `2px` |
| `--shadow-panel` | `0 16px 48px rgba(0,0,0,0.18)` |
| `--duration-control` | `180ms` |
| `--duration-panel` | `280ms` |
| `--ease-control` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-panel` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--tap-size` | `44px` |

Файлы реализации: tokens/base/layout/components/motion/content-fonts/content-layout/content-interface.css, main/content.js, local fonts/OFL/manifest. Для нового проекта использовать отдельный scopedbrief и доказательства; эта память versionedinstructions, не изменениевесовмодели.
