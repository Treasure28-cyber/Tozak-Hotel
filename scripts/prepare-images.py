import json,hashlib
from pathlib import Path
from PIL import Image,ImageOps,ImageStat
root=Path('src/assets/images');target=root/'responsive';target.mkdir(exist_ok=True)
manifest={};inventory=[]
for p in sorted(root.iterdir()):
 if not p.is_file() or p.suffix.lower() not in ['.jpg','.png','.webp']:continue
 image=ImageOps.exif_transpose(Image.open(p)).convert('RGB')
 w,h=image.size
 variants=[]
 for width in sorted(set([min(360,w),min(640,w),w])):
  resized=image.resize((width,round(h*width/w)),Image.Resampling.LANCZOS) if width<w else image
  name=f'{p.stem}-{width}.webp';dest=target/name;resized.save(dest,'WEBP',quality=82,method=6)
  variants.append({'file':'responsive/'+name,'width':width,'height':resized.height,'bytes':dest.stat().st_size})
 manifest[p.name]={'width':w,'height':h,'variants':variants}
 inventory.append({'file':p.name,'width':w,'height':h,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'meanBrightness':round(ImageStat.Stat(image.convert('L')).mean[0],1)})
Path('src/image-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
Path('tmp/image-inventory.json').write_text(json.dumps(inventory,indent=2),encoding='utf-8')
print(json.dumps(inventory,indent=2))
