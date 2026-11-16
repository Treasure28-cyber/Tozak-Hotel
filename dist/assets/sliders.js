export function slideIndex(current, direction, count) {
  return count > 0 ? ((current + direction) % count + count) % count : 0;
}

export function initSlider(root, view = window, doc = document) {
  const slides = [...root.querySelectorAll('[data-slide]')];
  if (slides.length < 2) return () => {};
  const dots = [...root.querySelectorAll('[data-slide-to]')];
  const controls = root.querySelector('.slider-controls');
  const play = root.querySelector('[data-slide-play]');
  const status = root.querySelector('[data-slide-status]');
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = Number(root.dataset.autoplay) || 0;
  const removers = [];
  let current = 0, timer, paused = false, hovering = false, focused = false, pointerStart;
  const listen = (target, type, callback) => {
    if (!target) return;
    target.addEventListener(type, callback);
    removers.push(() => target.removeEventListener(type, callback));
  };
  const schedule = () => {
    view.clearTimeout(timer);
    const blocked = paused || preference.matches;
    root.dataset.paused = String(blocked);
    if (play) {
      play.disabled = preference.matches;
      play.setAttribute('aria-pressed', String(blocked));
      play.setAttribute('aria-label', preference.matches ? 'Automatic slideshow disabled by reduced-motion preference' : paused ? 'Resume automatic slideshow' : 'Pause automatic slideshow');
    }
    if (interval && !blocked && !hovering && !focused && !doc.hidden) timer = view.setTimeout(() => show(slideIndex(current, 1, slides.length)), interval);
  };
  const show = (index, manual = false) => {
    current = slideIndex(index, 0, slides.length);
    slides.forEach((slide, i) => {
      const selected = i === current;
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
      if (selected) {
        const image = slide.querySelector('img');
        if (image) image.loading = 'eager';
      }
    });
    dots.forEach((dot,i) => dot.setAttribute('aria-pressed', String(i === current)));
    if (manual) {
      paused = true;
      if (status) status.textContent = `Photograph ${current + 1} of ${slides.length}: ${slides[current].querySelector('img')?.alt || ''}`;
    }
    schedule();
  };
  listen(root.querySelector('[data-slide-prev]'), 'click', () => show(slideIndex(current,-1,slides.length),true));
  listen(root.querySelector('[data-slide-next]'), 'click', () => show(slideIndex(current,1,slides.length),true));
  dots.forEach((dot,index) => listen(dot,'click',() => show(index,true)));
  listen(play,'click',() => {paused = !paused; schedule();});
  listen(root,'pointerenter',event => {if(event.pointerType === 'mouse'){hovering = true;schedule();}});
  listen(root,'pointerleave',() => {hovering = false;schedule();});
  listen(root,'focusin',() => {focused = true;schedule();});
  listen(root,'focusout',event => {focused = root.contains(event.relatedTarget);schedule();});
  listen(doc,'visibilitychange',schedule);
  listen(preference,'change',schedule);
  listen(root,'keydown',event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(slideIndex(current,event.key === 'ArrowRight' ? 1 : -1,slides.length),true);
  });
  listen(root,'pointerdown',event => {
    if (event.pointerType !== 'mouse' && !event.target.closest('button,a')) pointerStart = {x:event.clientX,y:event.clientY};
  });
  listen(root,'pointerup',event => {
    if (!pointerStart) return;
    const dx = event.clientX - pointerStart.x, dy = event.clientY - pointerStart.y;
    pointerStart = undefined;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) show(slideIndex(current,dx < 0 ? 1 : -1,slides.length),true);
  });
  listen(root,'pointercancel',() => {pointerStart = undefined;});
  if (controls) controls.hidden = false;
  show(0);
  return () => {view.clearTimeout(timer);removers.forEach(remove => remove());};
}

export function initSliders(view = window, doc = document) {
  const cleanups = [...doc.querySelectorAll('[data-slider]')].map(root => initSlider(root,view,doc));
  return () => cleanups.forEach(cleanup => cleanup());
}
