import assert from 'node:assert/strict';
import fs from 'node:fs';
import { slideIndex, initSlider } from '../src/assets/sliders.js';
class Element extends EventTarget {
 constructor(){super();this.attrs={};this.dataset={};this.hidden=false;this.items={};this.classes=new Set();this.classList={toggle:(name,on)=>on?this.classes.add(name):this.classes.delete(name)};}
 setAttribute(name,value){this.attrs[name]=value;}
 querySelector(selector){return this.items[selector] || null;}
 querySelectorAll(selector){return this.items[selector] || [];}
 contains(target){return target===this;}
 closest(){return null;}
 emit(type,properties={}){const event=new Event(type,{cancelable:true});for(const [key,value] of Object.entries(properties))Object.defineProperty(event,key,{value});this.dispatchEvent(event);return event;}
}
function setup({reduced=false,autoplay=true}={}){
 const root=new Element(),doc=new Element(),preference=new Element();preference.matches=reduced;doc.hidden=false;
 const timers=new Map();let sequence=0;
 const view={matchMedia:()=>preference,setTimeout:fn=>{timers.set(++sequence,fn);return sequence;},clearTimeout:id=>timers.delete(id)};
 root.dataset.autoplay=autoplay?'7000':'';
 const slides=Array.from({length:3},(_,i)=>{const slide=new Element();slide.items.img={alt:'Photo '+(i+1)};return slide;});
 const dots=Array.from({length:3},()=>new Element());
 root.items={'[data-slide]':slides,'[data-slide-to]':dots,'.slider-controls':new Element(),'[data-slide-play]':autoplay?new Element():null,'[data-slide-status]':new Element(),'[data-slide-prev]':new Element(),'[data-slide-next]':new Element()};
 root.items['.slider-controls'].hidden=true;
 const dispose=initSlider(root,view,doc);
 const current=()=>slides.findIndex(slide=>slide.classes.has('is-active'));
 const tick=()=>{const [id,fn]=[...timers][0];timers.delete(id);fn();};
 return {root,doc,preference,slides,dots,timers,dispose,current,tick};
}
assert.equal(slideIndex(0,-1,3),2);
assert.equal(slideIndex(2,1,3),0);
assert.equal(slideIndex(0,1,0),0);
const hero=setup();
assert.equal(hero.current(),0);assert.equal(hero.timers.size,1);
assert.equal(hero.root.items['.slider-controls'].hidden,false);
hero.tick();assert.equal(hero.current(),1);assert.equal(hero.root.items['[data-slide-status]'].textContent,undefined,'Automatic rotation does not announce repeatedly');
hero.root.items['[data-slide-next]'].emit('click');
assert.equal(hero.current(),2);assert.equal(hero.timers.size,0,'Manual selection stops autoplay');
assert.match(hero.root.items['[data-slide-status]'].textContent,/Photograph 3 of 3/);
assert.equal(hero.dots[2].attrs['aria-pressed'],'true');
assert.equal(hero.slides[1].attrs['aria-hidden'],'true');
hero.root.items['[data-slide-play]'].emit('click');assert.equal(hero.timers.size,1,'Resume restarts rotation');
hero.root.emit('focusin');assert.equal(hero.timers.size,0,'Focus pauses rotation');
hero.root.emit('focusout',{relatedTarget:null});assert.equal(hero.timers.size,1);
hero.doc.hidden=true;hero.doc.emit('visibilitychange');assert.equal(hero.timers.size,0,'Hidden tab stops rotation');
hero.doc.hidden=false;hero.doc.emit('visibilitychange');assert.equal(hero.timers.size,1);
hero.preference.matches=true;hero.preference.emit('change');assert.equal(hero.timers.size,0);assert.equal(hero.root.items['[data-slide-play]'].disabled,true);
hero.root.items['[data-slide-prev]'].emit('click');assert.equal(hero.current(),1,'Reduced motion keeps manual navigation working');
hero.root.emit('pointerdown',{pointerType:'touch',clientX:180,clientY:70,target:hero.root});
hero.root.emit('pointerup',{clientX:70,clientY:75});assert.equal(hero.current(),2,'Horizontal swipe advances');
hero.root.emit('pointerdown',{pointerType:'touch',clientX:180,clientY:70,target:hero.root});
hero.root.emit('pointerup',{clientX:170,clientY:200});assert.equal(hero.current(),2,'Vertical scrolling does not advance');
const key=hero.root.emit('keydown',{key:'ArrowRight'});assert.ok(key.defaultPrevented);assert.equal(hero.current(),0);
hero.dispose();assert.equal(hero.timers.size,0);
const manual=setup({autoplay:false});assert.equal(manual.timers.size,0,'Editorial sliders do not autoplay');manual.dispose();
const quiet=setup({reduced:true});assert.equal(quiet.timers.size,0,'Reduced motion never starts autoplay');quiet.dispose();
const html=fs.readFileSync('dist/index.html','utf8');
assert.equal((html.match(/data-slider /g)||[]).length,4,'Hero and three story sliders rendered');
assert.equal((html.match(/data-autoplay="7000"/g)||[]).length,1,'Only the hero auto-rotates');
assert.ok(html.includes('A Stay Worth Looking Forward To.'));
assert.ok(html.indexOf('id="welcome"') < html.indexOf('id="rooms"'),'Introduction precedes room browsing');
console.log('Passed: slider wrapping, autoplay, pause/resume, reduced motion, focus, tab visibility, touch gestures, keyboard and reference layout.');
