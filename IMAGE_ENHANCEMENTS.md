# AI-enhanced supplied room photographs

Five enhanced masters were generated with the built-in ImageGen tool and saved non-destructively under src/assets/originals/enhanced-new. Their web exports and responsive variants are project assets, rather than references to the Codex image cache. The original master directory is excluded from deployment by the existing build filter.

## Selected outputs
| Output | Input | Dimensions | Use |
| --- | --- | --- | --- |
| room-neutral-ai-v1.webp | User's soft neutral-bedroom photo; local original saved as bedroom-neutral-source.webp | 1756 × 895 | Rooms photo viewer and Gallery |
| room-warm-front-ai-v1.webp | Warm gold room, frontal/headboard view | 1756 × 895 | Rooms photo viewer and Gallery |
| room-warm-desk-ai-v1.webp | Warm gold room, desk/wardrobe view | 1756 × 895 | Rooms photo viewer and Gallery |
| room-warm-window-ai-v1.webp | Warm gold room, window/TV view | 1756 × 895 | Rooms photo viewer and Gallery |
| sitting-room-ai-v2.webp | Soft sitting-room photo with brown armchairs | 1756 × 896 | Gallery (hotel spaces) |

Prompts requested conservative restoration: preserve architecture, furniture, perspective, colours and source marks; reduce compression/noise and increase clarity. Three warm-room views were handled by an image-generation agent as requested. The neutral bedroom and sitting room were handled by the main agent. The warm window view was corrected after a draft added an unsupported circular fitting. The sitting-room source watermark was corrected after a draft reconstructed a different brand name. Rejected drafts remain outside live image references; the selected versions were visually reviewed.

## Accuracy and publication status
AI enhancement reconstructs fine detail. Bedding patterns, small fittings, artwork texture and watermark contours/lettering are not guaranteed pixel-exact reproductions of the sources. These derivatives are labelled AI-enhanced in Gallery thumbnails, the lightbox title and the shared room-photo viewer. Source marks have not intentionally been removed. The hotel must compare the outputs with the actual rooms and confirm publication rights before a public launch.

The owner subsequently authorised illustrative category assignments. Single Room uses the enhanced neutral bedroom; Double Deluxe uses the existing oak-bed photo; Executive Double uses the existing twin-bed photo; Continental Suite groups the three warm bedroom views and sitting room. These selections are not verified category matches: categoryVerified remains false, image labels/disclosures stay visible, and room specifications remain unchanged. The warm views are kept together rather than represented as three different room categories.

The new photo viewer is on the Rooms overview, not an extra repeated homepage section. The simplified homepage, existing booking flow and room facts remain unchanged.

## Pending inputs
The larger vertical pool photo is the stronger of the two supplied pool references. Its source file and the first small bedroom photo could not be reached by the image editor's available reference mechanism; reattachment was requested. No replacement pool image has been invented or added, and the existing pool imagery remains. These two inputs are not claimed as enhanced or integrated.

## Validation
Build and automated checks include derivative dimensions, mobile variants, labels, unassigned category status, dynamic Gallery counts and links from all four room pages to room photographs. Actual browser rendering remains unverified because browser access is unavailable. The owner has approved committing and pushing these changes. Production deployment remains unverified.
