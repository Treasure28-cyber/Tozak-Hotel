import fs from 'node:fs';
import { createCanvas, DOMMatrix, ImageData, Path2D } from 'file:///C:/Users/pc/Desktop/Web-Dev-Agency/CarlawGuestHouse/node_modules/@napi-rs/canvas/index.js';
Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
const {getDocument}=await import('file:///C:/Users/pc/Desktop/Web-Dev-Agency/CarlawGuestHouse/node_modules/pdfjs-dist/legacy/build/pdf.mjs');
fs.mkdirSync('tmp/references',{recursive:true});
const files=['Home (desktop) (1).pdf','screencapture-hotels-ng-hotel-1004572-tozak-hotel-delta-2026-10-14-14_51_17.pdf','screencapture-springhillhotelandsuites-2026-10-14-13_14_34.pdf'];
for(let i=0;i<files.length;i++){
 const doc=await getDocument({data:new Uint8Array(fs.readFileSync('C:/Users/pc/Downloads/'+files[i])),useSystemFonts:true}).promise;
 const texts=[];
 for(let n=1;n<=doc.numPages;n++){
  const page=await doc.getPage(n);const initial=page.getViewport({scale:1});const viewport=page.getViewport({scale:Math.min(1100/initial.width,7000/initial.height)});
  const canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height));await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
  fs.writeFileSync(`tmp/references/reference-${i+1}-${n}.png`,canvas.toBuffer('image/png'));
  texts.push((await page.getTextContent()).items.map(item=>item.str).join(' '));
 }
 fs.writeFileSync(`tmp/references/reference-${i+1}.txt`,texts.join('\n'));console.log(`${files[i]}: ${doc.numPages} pages rendered`);
}
