# Tozak homepage: HCI and readability review

Reviewed: the four-page PDF supplied on 17 November 2026, together with the corresponding HTML/CSS source. The PDF is a desktop capture split over four sheets. Page breaks and blank print space are PDF artifacts, not evidence of website spacing faults.

These scores are a subjective expert review of the PDF version, not a user study, conversion measurement or accessibility certification.

| Area | Score | Interpretation |
| --- | --- | --- |
| Visual character | 8/10 | Warm ivory, deep teal and expressive serif headings give a coherent hospitality identity. |
| Navigation and booking signposting | 7/10 | Familiar destinations and a clear booking action; actual interaction and mobile behavior need browser testing. |
| Content economy | 5/10 | The pool, rooms and courtyard are retold through stories, experience cards and a gallery preview. |
| Inclusive readability | 6/10 | Display headings are readable, but practical supporting copy, form fields and footer links are disproportionately small. |
| Property-specific distinction | 6/10 | Real photography helps; repeated hospitality slogans and unconfirmed category photographs weaken the sense of a specific place. |
| Overall | 7/10 | Strong visual foundation; the clearest improvement is fewer sections and stronger practical information. |

## The design opportunity
Make the homepage feel like a personal welcome to Ughelli, with one useful answer per section: why stay, which room, what is available, how to enquire. Keep the large serif headings; use the sans-serif for practical reading. The serif itself is not inherently unsuitable for older readers: size, contrast, spacing, stroke clarity and context matter more than a blanket font-category rule.

A distinctive next step would be a compact, factual room comparison based on confirmed bed arrangement, occupancy and inclusions. This would help visitors choose, instead of adding another decorative section. Category-specific room photos and a small set of authentic daylight property photos would do more for credibility and distinction than generated imagery. This is a recommendation, not a completed feature: reliable room specifications are still required.

## Implemented locally
- Removed the separate pool and shared-space stories, duplicate photographic experience cards and homepage gallery preview. The Gallery remains in the main/footer navigation.
- Removed the redundant Explore all rooms CTA immediately after showing all four categories; room cards and the Rooms navigation remain.
- Homepage progression is now hero, brief introduction, rooms, services/amenities, compact booking invitation, footer. An empty review section remains unpublished.
- Replaced tiny horizontal amenity labels with six large icons and short names. The grid is three columns on desktop and two on mobile; icons are 56/48 px and labels roughly 18–24 px (17 px at the smallest breakpoint).
- No descriptive amenity paragraphs, repetitive amenity headings or confirmation note are shown in that section. Existing breakfast, cancellation and booking caveats remain in the Contact/enquiry experience; availability is still subject to hotel confirmation.
- Increased practical introductory/supporting text to 16 px, key links to 14 px, form inputs to 16 px, form labels to 14 px, and footer copy/links to 14 px. Footer links now have at least 44 px of vertical target space.
- Preserved native heading hierarchy, text labels alongside icons, keyboard focus, reduced-motion support, the approved hero copy and the hotel contact details.
- Preserved the #pool destination on the amenities grid so the retired Facilities redirect remains useful.

## How different visitors may experience it
These are design hypotheses to test, not assumptions that everyone in an age group behaves alike.

- Younger/mobile-first visitors: the shorter page supports quick scanning, room exploration and direct enquiry. Repeated sections add scrolling without new decisions.
- Middle-aged or time-constrained visitors: clear room differences, inclusions and an accessible direct quote are more useful than additional mood copy. The simplified sequence should make those tasks easier to find.
- Older guests, or anyone with reduced vision or dexterity: larger practical copy and targets reduce the need for precision and magnification. Stable text, plain labels, good contrast and a visible telephone option matter. Keep the atmosphere, but avoid relying on tiny uppercase text, pale accents or icons alone for essential information.
- People using zoom, keyboard access or reduced motion: preserve semantic order and focus behavior; verify 200% text enlargement and narrow-width reflow before asserting accessibility conformance.

## HCI principles behind the changes
- Reduce cognitive load and choice repetition: each section adds a different piece of information.
- Recognition rather than recall: meaningful icon labels and familiar navigation destinations remain visible.
- Visual hierarchy/proximity: larger amenity symbols and names read as clear groups.
- Fitts's law: generous controls and link hit areas make actions easier to acquire.
- User control and feedback: keyboard access, reduced-motion preferences, explicit enquiry status and existing phone contact provide alternatives to visual browsing.

## Standards and validation limits
WCAG does not prescribe a universal minimum font size. The font sizes above are design choices for this site. Normal text needs at least 4.5:1 contrast (large text 3:1), with actual rendered backgrounds taken into account. WCAG 2.2 AA target size is generally 24 by 24 CSS px or adequate spacing, subject to exceptions; 44 px is our more generous design choice. Text enlargement to 200% without lost content or functionality needs browser verification.

Sources:
- W3C, older users: https://www.w3.org/WAI/older-users/
- WCAG contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG target sizes: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG text resizing: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

The production build and route/booking/motion/slider checks pass after the simplification. Updated checks also cover the removed duplicate sections and the six-item labelled amenities grid. The PDF supports a visual critique of the former desktop presentation; it cannot verify live contrast over every slideshow image, mobile layouts, screen readers, keyboard behavior, zoom, performance or usability with real people. Browser visual verification remains outstanding. The new changes have not been committed or pushed.
