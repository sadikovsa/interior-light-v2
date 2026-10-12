# Форма / Object — фактическая дизайн-система

Оглавление: 1. Scope; 2. Типографика и цвет; 3. Главы и сетка; 4. Сцена; 5. Интерфейсы; 6. DEMO/SEO; 7. Проверки; 8. Токены.

## 1. Scope

Предметный каталог. Статичные HTML/CSS/vanilla JS без сборщика; фактический код документирован 11 октября 2026 после PM ACCEPTED, QA_PASS_WITH_NOTES и независимого REVIEW_SHIP. Владелец принял hero и content/additions comps исторически; это не новое утверждение финального runtime.

Hero сохраняет системные шрифты/глобальные токены. Нижняя система scoped `.content-r3--object` и использует свои `--c-*`. Старые три папки сохранены без изменений. HTML/fonts/images/vendor/main.js/tokens в QA round1 не менялись. BUG-QA-03: только media(max-width:359px), f-set minmax(0,1fr), child min-width:0 и H2clamp(1.75rem,8.75vw,2rem)=28px при 320. Колонка номеров 56px + gap16px/padding72px сохранена.

Current 175 input SHA256 `7a619e74dbb829cb788c252ca954495ff9fcc97126aa7fac7cf89b230bf26a72`. Эти DESIGN/design.json — non-runtime дополнения, исключённые из 175 измеренных файлов и Sites/Pages artifact. JSON содержит actual значения; не является повторным измерением.

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

Это семь содержательных глав, два развёрнутых DEMO-кейса, FAQ4 и форма. Mobilechapter padding32px20px/gap20; tablet≥76840px32px/gap24; desktop≥120056px `max(64px,calc((100vw - 1312px)/2))`/gap32. Нижний gutter самостоятелен от глобального 80rem. Scroll-margin-top7rem; mobile одно/локальныепарные grid, tablet две и desktop асимметричныеполосы.

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

Фото в `.r3-media` defaultaspect3/2/object-fit:cover; отдельные портреты/детали имеют собственные proportions/object-position/static-scale. SVG схемы contain4/3, bench-node2/3. Полный master открывается по обычной gallerylink; crop не scroll-анимация. Lazyasyncdecode/srcset/widthheight и видимые AI/DEMOcaptions/alt сохранены; внутренние provenanceledger не удалять.

## 4. Tunnel / Zoom-through

Local GSAP/ScrollTrigger3.13.0 в `assets/js/vendor/`; `main.js` владеет scene/menu. Native scroll, один обратимый driverp0…1, pin `.scene-stage`/scrub:true/starttop top/invalidateOnRefresh/anticipatePin1. Backdrop/farplane3 имеют world scale; отдельно вырезанные plane1/2 ускоряются после выхода архитектурных силуэтов, затем открывается destination комната. Нет wheelhijack.

Ось: x=0.5364832535885168, y=0.563230605738576. World scale `1+(18-1)*clamp(p/.94)^2`; near1 start0.46/multiplier`1+2*clamp((p-start)/(1-start))`; near2 start0.74/`1+1.4*…`. Camera travel к p.64; endX=−(axisX−.5)*canvasWidth/endY=−(axisY−.5)*canvasHeight. Mobile≤600startX=endX+stageWidth*.025, desktop0. Destination1…1.12 к p.94; hero UI fade.05….21, hero.inertp>.22. Scroll range 2viewportdesktop/1.3mobile≤600.

Canvasmax(100vw,177.683svh)×max(100svh,56.28vw), центр translate(−50%,−50%). Stage100svh/min-height36rem, ≤60033rem. Image-load/filtersrefresh триггеров. ReducedmatchMediacleanup снимает pin/transforms/opacity, inert=false; transitionsinstant. NoJS статичная architecture+destinationfallback и полныйконтент. Эти фазы относятся к фактической геометрии, не универсальный preset.

## 5. Компоненты

Menu<768 aria-expanded/Escape/focusrestore, WAAPIheight/opacity280ms, reduced0. Ссылки без подчёркивания; focusoutline3px/offset4, controls≥44px, formfields/submit≥52px.

Фильтры all, living, bedroom: aria-pressed/count, два кейса; first case chapter с filters остаётся видимой при скрытом case, чтобы#projects→Все восстановил список. После изменения height ScrollTrigger.refresh; noJSfiltersdisabled/allcasesvisible.

Gallery16 ссылок, native dialog, requested отдельно от displayedactive. Next/Prev накапливаются относительно requested; после native Image.decode generation/dialog.open guard применяет image/alt/caption/counter одним выбором. Decodeerror сохраняет lastgood, resetrequestedactive/status; closeinvalidate+touchreset, delayedcloseevent не портит reopen. Arrowkeys/Tabtrap/nativeEscape/focusrestore, swipe горизонт>|48|px. Dialogwidthmin(1200px,100vw−32px), max94dvh/padding20/stickybar/overflowauto; imagecontainmax70dvh. ≤600width100vw−20px/padding12/image54dvh. NoJS прямая ссылка работает.

FAQ4 native detailsopen в HTML; JS закрывает и реверсирует от текущих height/opacity, cancel предыдущего WAAPI,280ms/cubic-bezier(.22,1,.36,1). Reducedinstant, noJSopen. Localform typebutton: trimname/message, contactemail с@/точкой или телефон 7–15 цифр допустимыхсимволов; inlineerrors/aria-invalid/firstinvalidfocus, successstatusfocus. SubmitpreventDefault, нет POST/storage/backend. NoJScheckdisabled+честноепояснение.

## 6. DEMO, SEO и доставка

Кейсы/схемы/бренды вымышлены; AI изображения подписаны. `[НУЖЕН ТЕКСТ ЮРИСТА]` сохраняется. Реальный запуск требует всех замен [PM§4](../interior-demo/.studio/v2/seo-qa-release/06-delivery.md); owner разрешил публичный DEMO, не превращение его в настоящий бизнес.

Уникальные title/description/canonical/OG/Twitter, neutralWebPageJSONLD, localicons/manifest/noSW. Canonical `https://interior-studio-v2.dilsan881.chatgpt.site/interior-light-v2/`. `noindex,follow` намерен, robots разрешает его получить, sitemap исключает noindexURL; нет fictitiousOrganization/LocalBusiness/reviews. Pagesdocs готов и локально проверен, APIenable403 «Resource not accessible by integration»: рассчитанный github.ioURL не live. SHA/privateSitepublicationproof фиксирует root отдельным release, не этот design документ.

## 7. QA, review и границы

[Fix03](../interior-demo/.studio/v2/seo-qa-release/03-fix-notes.md), [QA05a](../interior-demo/.studio/v2/seo-qa-release/05a-qa-recheck.md), [review05b](../interior-demo/.studio/v2/seo-qa-release/05b-design-review.md), [SEO04§8](../interior-demo/.studio/v2/seo-qa-release/04-seo-report.md), [PM06](../interior-demo/.studio/v2/seo-qa-release/06-delivery.md), [freshinventory](../interior-demo/.studio/v2/seo-qa-release/qa-recheck-evidence-index.json). Исторические FAIL/bugproof сохранены. Current native wheel3×390/1440 через 9 глав/назад Y0; rapidgallerynative-network6/6 +metadata/error/retry/reopen; noJS/reduced passed. Freshcontrast14targets прошли; Формы 320/360/390/768overflow0. Reviewer открыл шесть corrected кадров; прочие неизменные lower/motioncontracts reuseR3review, не новыйполныйпросмотр documenter.

Final isolated LH13.5.0/Chromium151/Node24.19.0 localhostHTTP/no-store: mobilePerformance75/LCP4811.34ms; desktop98/1115.62ms; CLS0/A100/BP100/SEO66intentionalnoindex. Simulated4Gmobile412×823CPU4, desktop1440×900CPU1. Mobile LCP>4s —известный P2advisory, не good mobile CWV; hard численногобюджетав AC небыло. INP/field CWV/FPS неизмерено/TBT не INP. MP425/26.64/25.24s —исторические R3 записи, current playback проверен, correctedpixels внихнет.

НЕ ПРОВЕРЕНО: Firefox/WebKit/Safari, physical phones, screen readers/assistive tech, OSIME/softkeyboard, toolbar200%zoom, все motion/hover/gradientcontraststates, полный WCAG, субъективнаяплавность/FPS, field CWV/INP, новый publicPagesdeployment. Reflow640CSSpx/DPR2 не toolbarzoom; A100 неполнаясертификация. Это документирование доказательств, не повтор browserQA.

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
