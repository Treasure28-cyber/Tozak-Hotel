import { localToday, validDate, validateEnquiry, messageForEnquiry, whatsappUrl, enquirySummary } from './booking.js';
export function initEnquiryForms(view = window, doc = document) {
 const cleanups=[];
 doc.querySelectorAll('[data-booking-form]').forEach(form=>{
  const checkin=form.elements.checkin,checkout=form.elements.checkout;
  const result=form.querySelector('.form-result'),summary=form.querySelector('.form-error-summary');
  const fields=[...form.querySelectorAll('input,select,textarea')];
  const listen=(target,event,handler)=>{target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));};
  const errorFor=(field,message)=>{
   const output=field.parentElement.querySelector('.field-error');
   if(output) output.textContent=message||'';
   field.setAttribute('aria-invalid',String(Boolean(message)));
  };
  checkin.min=localToday();checkout.min=localToday();
  form.querySelector('[type="submit"]').disabled=false;
  fields.forEach(field=>listen(field,'input',()=>{errorFor(field,'');result.hidden=true;if(summary)summary.hidden=true;}));
  listen(checkin,'change',()=>{
   if(validDate(checkin.value)) {
    const next=new Date(checkin.value+'T12:00:00Z');next.setUTCDate(next.getUTCDate()+1);
    checkout.min=next.toISOString().slice(0,10);
    if(!checkout.value)checkout.value=checkout.min;
   } else checkout.min=localToday();
   result.hidden=true;
  });
  listen(form,'submit',event=>{
   event.preventDefault();
   const data=Object.fromEntries(new view.FormData(form));
   const errors=validateEnquiry(data,form.dataset.bookingForm);
   fields.forEach(field=>errorFor(field,errors[field.name]));
   if(Object.keys(errors).length){
    result.hidden=true;
    if(summary){summary.textContent='Please check the highlighted details before continuing.';summary.hidden=false;}
    form.elements[Object.keys(errors)[0]].focus();return;
   }
   if(summary)summary.hidden=true;
   const link=result.querySelector('[data-message-link]');
   link.href=whatsappUrl(doc.body.dataset.whatsapp,messageForEnquiry(data,form.dataset.bookingForm));
   const details=result.querySelector('[data-enquiry-summary]');
   if(details)details.textContent=enquirySummary(data);
   result.hidden=false;
   link.focus();
  });
 });
 return ()=>cleanups.forEach(cleanup=>cleanup());
}

export function initBookingNavigation(view = window, doc = document, syncScroll = ()=>{}) {
 const dialog=doc.querySelector('#booking-dialog');
 const menu=doc.querySelector('#mobile-menu');
 const inline=doc.querySelector('main [data-booking-form="availability"]');
 const removers=[];
 let trigger;
 const listen=(target,event,fn)=>{if(!target)return;target.addEventListener(event,fn);removers.push(()=>target.removeEventListener(event,fn));};
 doc.querySelectorAll('a[href="/contact/#stay"],a[href="#stay"]').forEach(link=>listen(link,'click',event=>{
  if(!inline && !dialog)return;
  event.preventDefault();
  if(menu?.open)menu.close();
  if(inline){
   view.requestAnimationFrame(()=>{
    inline.scrollIntoView({behavior:view.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
    inline.elements.checkin.focus({preventScroll:true});
   });
  } else {trigger=link;dialog.showModal();syncScroll();}
 }));
 listen(dialog?.querySelector('.booking-close'),'click',()=>dialog.close());
 listen(dialog,'close',()=>{syncScroll();const origin=trigger?.closest?.('dialog');if(origin && !origin.open)doc.querySelector('.menu-toggle')?.focus();else trigger?.focus();});
 return ()=>removers.forEach(remove=>remove());
}
