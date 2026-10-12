(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = () => reduced.matches ? 0 : 280;
  const panelEase = 'cubic-bezier(0.22,1,0.36,1)';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');
  let menuAnimation;
  function setMenu(open, restore = false) {
    menuAnimation?.cancel();
    menu.setAttribute('aria-expanded', String(open));
    if (open) {
      navigation.classList.add('is-open');
      const height = navigation.scrollHeight;
      menuAnimation = navigation.animate([{ height: '0px', opacity: 0 }, { height: height + 'px', opacity: 1 }], { duration: duration(), easing: panelEase });
    } else if (navigation.classList.contains('is-open')) {
      menuAnimation = navigation.animate([{ height: navigation.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: duration(), easing: panelEase });
      menuAnimation.onfinish = () => navigation.classList.remove('is-open');
      if (restore) menu.focus({ preventScroll: true });
    }
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false, true); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  const desktopMenu = window.matchMedia('(min-width: 768px)');
  desktopMenu.addEventListener('change', () => { menuAnimation?.cancel(); navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); });

  // Every threshold is an independently clipped piece of the AI architecture.
  // One native reversible ScrollTrigger controls all transforms; no wheel listeners.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const match = gsap.matchMedia();
    match.add('(prefers-reduced-motion: no-preference)', () => {
      const stage = document.querySelector('.scene-stage');
      const canvas = document.querySelector('.scene-canvas');
      const camera = document.querySelector('.scene-camera');
      const theme = body.dataset.scene;
      const axisX = Number(body.dataset.axisX);
      const axisY = Number(body.dataset.axisY);
      const mobile = () => window.innerWidth <= 600;
      const startX = () => mobile() ? -(axisX - .5) * canvas.offsetWidth + stage.offsetWidth * .025 : 0;
      const endX = () => -(axisX - .5) * canvas.offsetWidth;
      const endY = () => -(axisY - .5) * canvas.offsetHeight;
      body.classList.add('motion-ready');
      const driver = { progress: 0 };
      const plane1 = document.querySelector('[data-plane="1"]');
      const plane2 = document.querySelector('[data-plane="2"]');
      const plane3 = document.querySelector('[data-plane="3"]');
      const backdrop = document.querySelector('.scene-backdrop');
      const destination = document.querySelector('.scene-destination');
      const hero = document.querySelector('.hero-copy');
      const heroUI = document.querySelectorAll('.hero-copy, .scene-word, .scroll-hint');
      const clamp = value => Math.max(0, Math.min(1, value));
      function renderScene() {
        const p = driver.progress;
        const world = 1 + ((theme === 'horizon' ? 32 : 18) - 1) * Math.pow(clamp(p / .94), 2);
        // Floor, environment and far facade share exactly the same camera.
        // Near pieces accelerate only after their source silhouettes have
        // physically left the frame, preventing duplicated edges or holes.
        const near1Start = theme === 'object' ? .46 : .34;
        const near2Start = theme === 'object' ? .74 : .68;
        gsap.set([backdrop, plane3], { scale: world });
        gsap.set(plane1, { scale: world * (1 + 2 * clamp((p - near1Start) / (1 - near1Start))) });
        gsap.set(plane2, { scale: world * (1 + 1.4 * clamp((p - near2Start) / (1 - near2Start))) });
        const travel = clamp(p / .64);
        gsap.set(camera, { x: startX() + (endX() - startX()) * travel, y: endY() * travel });
        gsap.set(destination, { scale: 1 + .12 * clamp(p / .94) });
        gsap.set(heroUI, { opacity: 1 - clamp((p - .05) / .16) });
        hero.inert = p > .22;
      }
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: '.architecture', start: 'top top', end: () => '+=' + window.innerHeight * (mobile() ? (theme === 'object' ? 1.3 : 1.4) : (theme === 'object' ? 2 : 2.2)),
        pin: stage, scrub: true, invalidateOnRefresh: true, anticipatePin: 1,
        onRefresh: renderScene
      }});
      timeline.to(driver, { progress: 1, duration: 1, ease: 'none', onUpdate: renderScene });
      renderScene();
      const imageRefresh = () => ScrollTrigger.refresh();
      document.querySelectorAll('.scene-backdrop, .scene-destination img').forEach(image => { if (!image.complete) image.addEventListener('load', imageRefresh, { once: true }); });
      return () => {
        body.classList.remove('motion-ready');
        hero.inert = false;
        gsap.set([camera, backdrop, plane1, plane2, plane3, destination, ...heroUI], { clearProps: 'transform,opacity' });
      };
    });
  }

  const projects = [...document.querySelectorAll("[data-r3-case]")];
  // Content interfaces are owned by assets/js/content.js.
})();
