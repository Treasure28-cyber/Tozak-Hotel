import assert from 'node:assert/strict';
import { initEnquiryForms, initBookingNavigation } from '../src/assets/enquiry-ui.js';
class Element extends EventTarget{
 constructor(){super();this.attrs={};this.items={};this.hidden=true;this.value='';}
 setAttribute(k,v){this.attrs[k]=v;}
 querySelector(q){return this.items[q]||null;}
 querySelectorAll(q){return this.items[q]||[];}
 focus(){this.focused=true;}
 scrollIntoView(options){this.scrolled=options;}
 emit(type){const event=new Event(type,{cancelable:true});this.dispatchEvent(event);return event;}
}
const form=new Element();form.dataset={bookingForm:'availability'};
form.elements=Object.fromEntries(['checkin','checkout','guests','room','message'].map(name=>{
 const field=new Element();field.name=name;field.parentElement=new Element();field.parentElement.items['.field-error']=new Element();return [name,field];
}));
const submit=new Element(),result=new Element(),summary=new Element(),link=new Element(),preview=new Element();
result.items={'[data-message-link]':link,'[data-enquiry-summary]':preview};
form.items={'.form-result':result,'.form-error-summary':summary,'input,select,textarea':Object.values(form.elements),'[type="submit"]':submit};
const doc={body:{dataset:{whatsapp:'2348064180488'}},querySelectorAll:()=>[form]};
const view={FormData:class extends Map{constructor(form){super(Object.entries(form.elements).map(([key,field])=>[key,field.value]));}}};
const cleanup=initEnquiryForms(view,doc);
assert.equal(submit.disabled,false,'Working JS enables submit');
form.emit('submit');assert.equal(summary.hidden,false);assert.ok(form.elements.checkin.focused);assert.equal(result.hidden,true);
form.elements.checkin.value='2099-12-31';form.elements.checkin.emit('change');
assert.equal(form.elements.checkout.min,'2100-01-01');assert.equal(form.elements.checkout.value,'2100-01-01','Empty checkout defaults to following day');
form.elements.checkout.value='2100-01-03';form.elements.guests.value='2';form.elements.room.value='Double Deluxe';form.elements.message.value='Late arrival & luggage';
form.emit('submit');
assert.equal(result.hidden,false);assert.equal(summary.hidden,true);assert.ok(link.focused);
const url=new URL(link.href);assert.equal(url.pathname,'/2348064180488');
const message=url.searchParams.get('text');
assert.match(message,/Double Deluxe/);assert.match(message,/Guests: 2/);assert.match(message,/Nights: 3/);assert.match(message,/Late arrival & luggage/);
assert.match(preview.textContent,/3 nights/);
form.elements.guests.value='0';form.emit('submit');assert.equal(result.hidden,true);assert.ok(form.elements.guests.focused);assert.equal(form.elements.guests.attrs['aria-invalid'],'true');
form.elements.guests.emit('input');assert.equal(form.elements.guests.attrs['aria-invalid'],'false');
cleanup();
function navigation(inlineExists,fromMenu=false){
 const trigger=new Element(),inline=new Element(),modal=new Element(),menu=new Element(),close=new Element(),toggle=new Element();
 if(fromMenu)trigger.closest=()=>menu;
 inline.elements={checkin:new Element()};modal.items['.booking-close']=close;modal.showModal=()=>modal.open=true;modal.close=()=>{modal.open=false;modal.emit('close');};menu.open=true;menu.close=()=>menu.open=false;
 const doc={querySelector:q=>q==='#booking-dialog'?modal:q==='#mobile-menu'?menu:q==='.menu-toggle'?toggle:inlineExists?inline:null,querySelectorAll:()=>[trigger]};
 let scrollCalls=0;
 const stop=initBookingNavigation({requestAnimationFrame:fn=>fn(),matchMedia:()=>({matches:true})},doc,()=>scrollCalls++);
 return {trigger,inline,modal,menu,toggle,stop,get scrollCalls(){return scrollCalls;}};
}
const room=navigation(true);assert.ok(room.trigger.emit('click').defaultPrevented);assert.equal(room.menu.open,false);assert.ok(room.inline.elements.checkin.focused);assert.equal(room.inline.scrolled.behavior,'instant');assert.ok(!room.modal.open,'Inline form takes priority over modal');room.stop();
const home=navigation(false);home.trigger.emit('click');assert.ok(home.modal.open);home.modal.close();assert.ok(home.trigger.focused);assert.equal(home.scrollCalls,2);home.stop();
console.log('Passed: enquiry input errors, checkout assistance, exact WhatsApp payload, stay summary, room form focus, modal opening and focus restoration.');

const fromMenu=navigation(false,true);fromMenu.trigger.emit('click');fromMenu.modal.close();assert.ok(fromMenu.toggle.focused,'Closing a menu-originated enquiry restores focus to the visible menu toggle');fromMenu.stop();
