import { initEnquiryForms, initBookingNavigation } from './enquiry-ui.js';

const menu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const syncScroll = () => document.body.classList.toggle('scroll-locked',Boolean(document.querySelector('dialog[open]')));
menuToggle?.addEventListener('click',() => {
  if(!menu.open) menu.showModal();
  menuToggle.setAttribute('aria-expanded','true');
  syncScroll();
});
menu?.querySelector('.menu-close').addEventListener('click',() => menu.close());
menu?.addEventListener('close',() => {
  menuToggle.setAttribute('aria-expanded','false');
  syncScroll();
  menuToggle.focus();
});
menu?.querySelectorAll('nav a').forEach(link => link.addEventListener('click',() => menu.close()));
window.addEventListener('resize',() => { if(window.innerWidth > 920 && menu?.open) menu.close(); });

initEnquiryForms();
initBookingNavigation(window,document,syncScroll);

const tiles = [...document.querySelectorAll('[data-photo]')];
const lightbox = document.querySelector('#photo-lightbox');
let visibleTiles = [...tiles];
let currentTile = null;
let previousFocus = null;
function showPhoto(tile) {
  currentTile = tile;
  const source = tile.querySelector('img');
  const image = lightbox.querySelector('#lightbox-image');
  image.src = source.src;
  image.alt = source.alt;
  lightbox.querySelector('#lightbox-title').textContent = tile.querySelector('.gallery-caption>span').textContent + (tile.dataset.enhanced==='true'?' · AI-enhanced':'');
  lightbox.querySelector('#lightbox-position').textContent = `${visibleTiles.indexOf(tile)+1} / ${visibleTiles.length}`;
}
function movePhoto(direction) {
  const index = visibleTiles.indexOf(currentTile);
  showPhoto(visibleTiles[(index+direction+visibleTiles.length)%visibleTiles.length]);
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',() => {
  const category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(filter => filter.setAttribute('aria-pressed',String(filter===button)));
  tiles.forEach(tile => tile.hidden = category !== 'all' && tile.dataset.category !== category);
  visibleTiles = tiles.filter(tile => !tile.hidden);
  document.querySelector('#gallery-count').textContent = `${visibleTiles.length} photograph${visibleTiles.length===1?'':'s'}`;
}));
const requestedCategory = new URLSearchParams(window.location.search).get('category');
const requestedFilter = [...document.querySelectorAll('[data-filter]')].find(button=>button.dataset.filter===requestedCategory);
requestedFilter?.click();

tiles.forEach(tile => tile.addEventListener('click',() => {
  previousFocus = tile;
  showPhoto(tile);
  lightbox.showModal();
  syncScroll();
}));
if(lightbox) {
  lightbox.querySelector('.lightbox-close').addEventListener('click',() => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click',() => movePhoto(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click',() => movePhoto(1));
  lightbox.addEventListener('keydown',event => {
    if(event.key === 'ArrowRight') {event.preventDefault(); movePhoto(1);}
    if(event.key === 'ArrowLeft') {event.preventDefault(); movePhoto(-1);}
  });
  lightbox.addEventListener('close',() => {syncScroll();previousFocus?.focus();});
  lightbox.addEventListener('click',event => {
    if(event.target !== lightbox) return;
    const bounds = lightbox.getBoundingClientRect();
    if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
  });
}
document.querySelector('[data-load-map]')?.addEventListener('click',event => {
  const container = document.querySelector('[data-map-container]');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://maps.google.com/maps?q=Tozak%20Hotel%20Ekiugbo%20Ughelli%20Delta%20State&output=embed';
  iframe.title = 'Tozak Hotel location on Google Maps';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.allowFullscreen = true;
  container.replaceChildren(iframe);
  container.hidden = false;
  event.currentTarget.hidden = true;
});

const siteHeader = document.querySelector('.site-header');
const updateHeader = () => siteHeader?.classList.toggle('is-scrolled',window.scrollY > 40);
window.addEventListener('scroll',updateHeader,{passive:true});
updateHeader();
// Motion is an enhancement; booking and navigation initialize first.
import { initMotion } from './motion.js';
initMotion();

import { initSliders } from './sliders.js';
initSliders();
