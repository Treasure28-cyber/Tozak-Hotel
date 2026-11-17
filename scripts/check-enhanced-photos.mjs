import assert from 'node:assert/strict';
import fs from 'node:fs';
import { enhancedPhotos } from '../src/enhanced-photos.mjs';
import { rooms } from '../src/assets/rooms.js';
const manifest=JSON.parse(fs.readFileSync('src/image-manifest.json','utf8'));
assert.equal(enhancedPhotos.length,5);
assert.equal(enhancedPhotos.filter(photo=>photo.category==='rooms').length,4);
for(const photo of enhancedPhotos){
 assert.equal(photo.enhanced,true);assert.equal(photo.categoryVerified,false);assert.equal(photo.reviewStatus,'awaiting-hotel-review');
 assert.ok(manifest[photo.file].width>=1700,'High-resolution derivative is present');
 assert.ok(manifest[photo.file].variants.some(v=>v.width===360),'Small-screen variant is present');
 assert.ok(!rooms.some(room=>room.photos.some(p=>p.file===photo.file && p.categoryVerified)),'No illustrative selection is marked as a verified category match');
}
const overview=fs.readFileSync('dist/rooms/index.html','utf8');
assert.ok(overview.includes('id="additional-room-photos"'));
assert.ok(overview.includes('AI-enhanced from supplied room photos'));
const gallery=fs.readFileSync('dist/gallery/index.html','utf8');
assert.equal((gallery.match(/class="image-enhancement-label"/g)||[]).length,5);
assert.ok(gallery.includes('id="rooms" data-filter="rooms"'));
for(const room of rooms)assert.ok(fs.readFileSync(`dist/rooms/${room.id}/index.html`,'utf8').includes('/gallery/?category=rooms#rooms'));
console.log('Passed: five labelled high-resolution derivatives, four illustrative room views, responsive variants and room-gallery navigation.');

assert.equal(rooms.find(r=>r.id==='single-room').photos[0].file,'room-neutral-ai-v1.webp');
assert.equal(rooms.find(r=>r.id==='continental-suite').photos.length,4);
assert.ok(rooms.every(r=>r.photos.every(p=>p.categoryVerified===false)));
