import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const base = path.resolve('dist');
const port = Number(process.env.PORT || 4174);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); res.end('Invalid URL'); return; }
  let file = path.resolve(base,'.'+pathname);
  if(file !== base && !file.startsWith(base+path.sep)){ res.writeHead(403); res.end(); return; }
  if(fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if(!fs.existsSync(file)){ file = path.join(base,'404.html'); res.statusCode = 404; }
  res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}).listen(port,'127.0.0.1',() => console.log(`Local: http://localhost:${port}`));
