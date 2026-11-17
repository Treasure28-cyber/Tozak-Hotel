import { rooms } from './assets/rooms.js';
export function verifiedRoomFacts(room) {
 const verified = new Set(room.verifiedFields || []);
 return [
  ['bed','Bed arrangement',room.bed],
  ['maxGuests','Guests',Number.isInteger(room.maxGuests) && room.maxGuests>0 ? `Up to ${room.maxGuests}` : null],
  ['breakfast','Breakfast',typeof room.breakfast === 'boolean' ? (room.breakfast?'Included':'Not included') : room.breakfast],
  ['additionalCharges','Additional charges',room.additionalCharges]
 ].filter(([key,,value])=>verified.has(key) && value!==null && value!==undefined && value!=='').map(([,label,value])=>({label,value}));
}
export function roomRate(room) {
 const rate=room.rate;
 if (!rate?.verified || !Number.isFinite(rate.amount) || rate.amount<=0 || rate.currency!=='NGN') return null;
 return `${rate.kind==='starting'?'From ':''}${new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(rate.amount)} per night`;
}
export function roomPhotos(room) {
 const approved=(room.photos||[]).filter(photo=>photo.categoryVerified);
 return approved.length?approved:room.photos||[];
}
