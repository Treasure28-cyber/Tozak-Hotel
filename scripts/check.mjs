import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { validateEnquiry, messageForEnquiry, whatsappUrl, validDate, localToday } from '../src/assets/booking.js';
const routes = ['', 'rooms', 'facilities', 'gallery', 'about', 'contact'];
const root = path.resolve('dist');
let references = 0;
for(const route of routes) {
  const file = path.join(root,route,'index.html');
  const html = fs.readFileSync(file,'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route||'home'}: exactly one H1`);
  assert.ok(html.includes('name="viewport"'),`${route}: responsive viewport`);
  assert.ok(html.includes('name="description"'),`${route}: page description`);
  assert.ok(!/\[(?:RATE|ROOM|EMAIL|YOUR|PASTE|CONFIRM)/.test(html),`${route}: no public placeholder copy`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${route}: unique IDs`);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(#[^"]+)?"/g)) {
    const target = path.join(root,match[1]);
    const actual = fs.existsSync(target) && fs.statSync(target).isDirectory()?path.join(target,'index.html'):target;
    assert.ok(fs.existsSync(actual),`${route}: missing local link or asset ${match[1]}`);
    if(match[2]) assert.ok(fs.readFileSync(actual,'utf8').includes(`id="${match[2].slice(1)}"`),`${route}: missing anchor ${match[2]}`);
    references++;
  }
  for(const match of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;','&'));
    assert.equal(url.pathname,'/2348064180488','WhatsApp destination');
    assert.ok(url.searchParams.get('text')?.includes('Tozak'),'Prefilled hotel enquiry');
  }
  for(const input of html.matchAll(/<(?:input|select|textarea)\b[^>]*id="([^"]+)"/g)) assert.ok(html.includes(`for="${input[1]}"`),`${route}: labelled form input`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(schema['@type'],'LodgingBusiness');
  assert.equal(schema.telephone,'+2348064180488');
  assert.ok(!schema.aggregateRating,'No unverified aggregate rating');
}
assert.ok(validDate('2028-02-29'));
assert.ok(!validDate('2027-02-29'));
assert.ok(!validDate('2026-02-30'));
assert.equal(localToday(new Date(2026,9,14,23)), '2026-10-14');
const stay = {checkin:'2026-12-20',checkout:'2026-12-22',guests:'2',room:'Double Deluxe'};
assert.deepEqual(validateEnquiry(stay,'availability','2026-10-14'),{});
assert.ok(validateEnquiry({...stay,checkout:stay.checkin},'availability','2026-10-14').checkout);
assert.ok(validateEnquiry({...stay,checkin:'2026-01-01'},'availability','2026-10-14').checkin);
assert.ok(validateEnquiry({...stay,guests:'0'},'availability','2026-10-14').guests);
assert.ok(validateEnquiry({},'availability','2026-10-14').checkin);
assert.deepEqual(validateEnquiry({name:'Ada',contact:'ada@example.com'},'contact','2026-10-14'),{});
assert.deepEqual(validateEnquiry({name:'Ada',contact:'+234 806 418 0488'},'contact','2026-10-14'),{});
assert.ok(validateEnquiry({name:'Ada',contact:'abc'},'contact','2026-10-14').contact);
assert.ok(validateEnquiry({name:' ',contact:'ada@example.com'},'contact','2026-10-14').name);
assert.ok(validateEnquiry({name:'Ada',contact:'ada@example.com',checkin:'2026-12-20'},'contact','2026-10-14').checkout);
const message = messageForEnquiry(stay,'availability');
const url = new URL(whatsappUrl('2348064180488',message));
assert.equal(url.searchParams.get('text'),message);
assert.ok(message.includes('Double Deluxe') && message.includes('20 Dec 2026') && message.includes('Guests: 2'));
assert.throws(()=>whatsappUrl('[2348064180488]',message));
assert.equal((fs.readFileSync('dist/gallery/index.html','utf8').match(/data-photo="/g)||[]).length,9);
console.log(`Passed: 6 routes, ${references} local references, structured data, form labels, 9 gallery photos and booking validation.`);
