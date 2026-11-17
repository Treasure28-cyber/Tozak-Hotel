# Warm room enhancement prompts and review

Mode: built-in ImageGen, editing the three supplied user photographs. These are AI-assisted restorations, not new property photographs or verified category assignments.

## Common invariants
Preserve exact room layout, camera viewpoint, room proportions, architecture, furniture, fixtures, artwork, curtains, bed configuration, colours and existing source watermark. Denoise compression blur and gently sharpen existing realistic wood/fabric texture. Do not remodel, add amenities, remove furnishings, improve furnishing quality, merge viewpoints or crop away the watermark. Output one faithful landscape restoration per target.

## warm-room-front-enhanced-v1.png
Target: frontal warm-gold room photograph with padded headboard/wood panels, white bed and patterned cushions, bedside lamps, flower wall art, gold curtain, luggage rack and upholstered bed-end bench. Apply the common invariants. Generated dimensions: 1756 x 895.

## warm-room-desk-enhanced-v1.png
Target: desk/wardrobe-side view, television and long wooden desk at left, kettle, central doorway, large rear wardrobe, floral artwork, patterned rug and bed at right. Apply the common invariants. Generated dimensions: 1756 x 895.

## warm-room-window-enhanced-v1.png
Target: window/TV-side view, bed entering from lower left, gold curtains, three small abstract paintings, wall-mounted television, wooden desk/kettle and right-side doorway. Apply common invariants. Generated dimensions: 1756 x 895.

A targeted correction removed a circular fitting invented above the curtain rod in the first restored window image: remove ONLY the small circular ring-like fitting reconstructed on the upper wall immediately above the right half of the curtain rod; fill the tiny area with the same plain cream wall and keep crop, perspective, proportions, all furnishings, paintings, curtains, TV, desk, bed, lighting, source watermark and colour unchanged. The corrected result is the saved window master; the discarded first draft is not integrated.

## QA and limits
All three images retain the broad source compositions and principal furnishings. Fine bedding, fabric grain, wall-art detail, electrical items and the Crystalbeds source watermark have been reconstructed by the image model and cannot be treated as pixel-exact recovery. The watermark remains present but its small lettering/contours differ from the source. They require owner/hotel review before public use and should remain labelled AI-enhanced/unassigned. No room category or property identity has been verified by this enhancement process.
