# Photography audit and replacement requirements

All ten source files are retained. Byte hashes show no exact duplicate files; two room photographs are reused across four categories. Source ownership and permission to publish remain unconfirmed. Measurements below describe the supplied files, not newly obtained hotel photos.

| File | Source dimensions | Original KB | Largest WebP KB | Assessment |
| --- | --- | ---: | ---: | --- |
| bar.jpg | 141 × 101 | 5.0 | 2.7 | Thumbnail only; displayed at intrinsic size to avoid extreme enlargement. |
| courtyard.jpg | 400 × 355 | 53.0 | 21.8 | Limited resolution; will soften at larger sizes. |
| fitness.jpg | 400 × 355 | 49.9 | 18.7 | Limited resolution; will soften at larger sizes. |
| garden.webp | 680 × 382 | 49.0 | 45.0 | Limited resolution; will soften at larger sizes. |
| lounge.jpg | 400 × 400 | 51.7 | 17.2 | Limited resolution; will soften at larger sizes. Dark interior; a brighter replacement is preferable. |
| pool-day.jpg | 400 × 400 | 75.0 | 30.8 | Limited resolution; will soften at larger sizes. |
| pool-enhanced.webp | 1254 × 1254 | 270.3 | 240.8 | Higher pixel count; AI-assisted enhancement requires comparison with the original. Not used in current page templates. |
| pool-night.jpg | 400 × 332 | 56.6 | 21.3 | Limited resolution; will soften at larger sizes. |
| room-oak.jpg | 635 × 355 | 56.6 | 24.0 | Limited resolution; will soften at larger sizes. Category assignment unverified. |
| room-twin.jpg | 600 × 246 | 63.6 | 21.9 | Limited resolution; will soften at larger sizes. Very wide crop; important bed context may be lost in portrait cards. Category assignment unverified. |

## Reuse and attribution
- room-oak.jpg currently illustrates Single Room and Double Deluxe. room-twin.jpg illustrates Executive Double and Continental Suite. These are property photos, not verified assignments; disclosure stays on the overview/homepage and individual room pages.
- The hero uses the existing pool-day, pool-night and room-oak photos; the introduction uses lounge/courtyard. Separate pool, courtyard stories and repeated gallery/experience previews remain removed.
- Original supplier-named files under src/assets/originals remain excluded from deployment. Their exact source ownership/licence is not established by a filename. The prior pool enhancement is an AI-assisted asset, not a new verified property photograph.
- Image audit checks source size, hash and brightness as supporting evidence. Brightness is not a full photographic-quality or accessibility assessment.

## Implementation
- src/image-manifest.json records accurate source dimensions and generated 360/640/source-width candidates (capped at the original width). Responsive WebP files are in src/assets/images/responsive. Nothing is upscaled.
- Generated templates include srcset, sizes, actual width/height, priority hero loading and below-fold lazy loading. Existing source files remain untouched.
- scripts/prepare-images.py regenerates variants using Pillow. It is a development-only step; production build/dev/check require only Node. Compression does not restore missing source detail.

## Hotel photographs needed, in priority order
1. Each of the four room categories: a full-room landscape and a second view, labelled by category, showing actual bed configuration. Ideally at least 1600 px on the long edge, with permission to publish.
2. A sharp daytime pool landscape for the hero (at least 1920 × 1080 preferred) plus a separate poolside view.
3. A current exterior/entrance photo showing the recognisable building and approach.
4. A brighter lounge/courtyard landscape and a usable replacement for the 141 × 101 bar thumbnail.
5. Optional bathroom and breakfast photos, only after their category/inclusion context is confirmed.

Supply original files rather than screenshots or messaging-app thumbnails. Confirm that visible facilities are currently available, and provide photographer/source permission. No new internet or unrelated stock photographs were introduced.

## New user-supplied room images
Five AI-enhanced derivatives were added locally: neutral bedroom, three warm bedroom views and a sitting room. They are labelled in the Gallery and shared room-photo viewer, not verified as exact room-category photographs. See IMAGE_ENHANCEMENTS.md for masters, dimensions, known reconstruction limits and outstanding pool/small-bedroom inputs. The original ten source images remain untouched. Pool imagery is unchanged pending reattachment of the chosen new source.
