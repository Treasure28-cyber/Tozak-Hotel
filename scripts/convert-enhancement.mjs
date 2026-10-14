// Development-only format conversion. The production site needs no image library.
import fs from 'node:fs';
import { createCanvas, loadImage } from 'file:///C:/Users/pc/Desktop/Web-Dev-Agency/CarlawGuestHouse/node_modules/@napi-rs/canvas/index.js';
const image = await loadImage('src/assets/originals/pool-enhanced.png');
const canvas = createCanvas(image.width,image.height);
canvas.getContext('2d').drawImage(image,0,0);
fs.writeFileSync('src/assets/images/pool-enhanced.webp',await canvas.encode('webp',84));
console.log(`Converted pool enhancement to WebP: ${image.width} × ${image.height}`);
