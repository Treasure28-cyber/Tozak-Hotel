// Progressive motion: content stays visible if JavaScript or animation APIs fail.
export function initMotion(view = window, doc = document) {
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  if (typeof view.Element?.prototype.animate !== 'function') return () => {};
  const active = new Map();
  const revealed = new WeakSet();
  let observer;
  let stopped = false;
  const play = (element, frames, options) => {
    if (!element || preference.matches || stopped || element.contains(doc.activeElement)) return;
    const animation = element.animate(frames, options);
    active.set(animation, element);
    animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  };
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const reveal = (element, delay = 0) => {
    if (revealed.has(element)) return;
    revealed.add(element);
    play(element, [{opacity: .18, translate: '0 22px'}, {opacity: 1, translate: '0 0'}], {duration: 1500, delay, easing: ease, fill: 'backwards'});
  };
  const start = () => {
    if (preference.matches || stopped) return;
    doc.querySelectorAll('.hero-copy > *, .page-band-copy > *').forEach((element, index) => reveal(element, Math.min(index, 3) * 180));
    doc.querySelectorAll('.hero-photo > img, .page-band-background img').forEach(element => {
      if (revealed.has(element)) return;
      revealed.add(element);
      play(element, [{transform: 'scale(1.045)'}, {transform: 'scale(1)'}], {duration: 1800, easing: ease});
    });
    if (!view.IntersectionObserver) return;
    observer = new view.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const siblings = entry.target.parentElement?.children;
        const index = siblings ? Array.prototype.indexOf.call(siblings, entry.target) : 0;
        reveal(entry.target, Math.min(Math.max(index, 0), 3) * 160);
      });
    }, {threshold: .06});
    doc.querySelectorAll('.centered-heading, .story-copy, .story-media, .section-intro, .experience-card, .room-card, .welcome-copy, .welcome-photos, .feature-photo, .feature-copy, .preview-tile, .gallery-tile, .direct-grid > div, .contact-details, .contact-form, .faq-grid > div, .practical-grid > div, .detail-grid > *, .room-booking').forEach(element => {
      if (!element.hidden && !revealed.has(element)) observer.observe(element);
    });
  };
  const cancel = () => {
    observer?.disconnect();
    active.forEach((element, animation) => animation.cancel());
    active.clear();
  };
  const onPreference = () => { cancel(); if (!preference.matches) start(); };
  const onFocus = event => active.forEach((element, animation) => {
    if (element.contains(event.target)) animation.cancel();
  });
  preference.addEventListener('change', onPreference);
  doc.addEventListener('focusin', onFocus);
  start();
  return () => {
    stopped = true;
    cancel();
    preference.removeEventListener('change', onPreference);
    doc.removeEventListener('focusin', onFocus);
  };
}

