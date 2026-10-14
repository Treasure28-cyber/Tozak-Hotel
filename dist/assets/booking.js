export function localToday(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
export function validDate(value) {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value+'T12:00:00Z');
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0,10) === value;
}
export function validateEnquiry(data,kind,today = localToday()) {
  const errors = {};
  if(kind === 'contact') {
    if(!data.name?.trim()) errors.name = 'Please enter your name.';
    const contact = data.contact?.trim() || '';
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const phone = /^[+()\d\s.-]+$/.test(contact) && contact.replace(/\D/g,'').length >= 7 && contact.replace(/\D/g,'').length <= 15;
    if(!email && !phone) errors.contact = 'Enter a valid phone number or email address.';
  }
  if(kind === 'availability' || data.checkin || data.checkout) {
    if(!validDate(data.checkin || '')) errors.checkin = 'Please choose a valid check-in date.';
    else if(data.checkin < today) errors.checkin = 'Choose today or a future date.';
    if(!validDate(data.checkout || '')) errors.checkout = 'Please choose a valid check-out date.';
    else if(validDate(data.checkin) && data.checkout <= data.checkin) errors.checkout = 'Check-out must be after check-in.';
  }
  if(kind === 'availability' && !['1','2','3','4','5+'].includes(data.guests)) errors.guests = 'Please choose the number of guests.';
  return errors;
}
export function displayDate(value) {
  return new Date(value+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
}
export function messageForEnquiry(data,kind) {
  const lines = ["Hello, I'd like to enquire about a stay at Tozak Hotel."];
  if(kind === 'contact') lines.push(`Name: ${data.name.trim()}`,`Contact: ${data.contact.trim()}`);
  if(data.checkin) lines.push(`Check-in: ${displayDate(data.checkin)}`);
  if(data.checkout) lines.push(`Check-out: ${displayDate(data.checkout)}`);
  if(data.guests) lines.push(`Guests: ${data.guests}`);
  if(data.room) lines.push(`Room preference: ${data.room}`);
  if(data.message?.trim()) lines.push(`Message: ${data.message.trim()}`);
  lines.push('Please confirm availability, the current rate and what is included.');
  return lines.join('\n');
}
export function whatsappUrl(number,message) {
  if(!/^\d{7,15}$/.test(number)) throw new Error('Invalid WhatsApp destination');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
