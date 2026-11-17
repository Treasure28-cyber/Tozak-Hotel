# Hotel confirmation required before a public launch

Existing contact details, address, four room names and property amenities were retained from project content. That is evidence of existing content, not a new independent verification by the hotel. Please have an authorised hotel contact confirm the following.

## For every room category
Single Room, Double Deluxe, Executive Double and Continental Suite each need:
- Current category name and whether the category is currently sold.
- Bed arrangement and size; maximum adults/children and any extra-bed rules.
- Which exact photographs represent that category; permission to publish them.
- Room amenities and distinctive features, including whether air conditioning and WiFi apply to that room.
- Current nightly/starting rate in NGN, effective date, taxes/fees, occupancy basis and any seasonal qualifications.
- Breakfast inclusion, extra-person/extra-bed charges and any other mandatory fees.
- Room-specific booking/arrival instructions and availability limitations.

Until supplied, rates/specifications remain unset and the site offers a quote for selected dates. There are no invented prices, dimensions, capacities or specific bed types. Do not fill unknown fields just to make a comparison table look complete.

## Hotel-wide practical information
- Confirm 0806 418 0488 / +2348064180488 and that the WhatsApp account belongs to the hotel and is monitored.
- Confirm Plot 25/27 Ekiugbo/Warri Road, Ekiugbo, Ughelli, Delta State, and the correct map pin/arrival directions.
- Check-in/check-out times; early/late arrival rules; ID requirements and any child policies.
- Booking confirmation procedure, required deposit, accepted payment methods, balance deadline and invoice/receipt process.
- Cancellation/refund/no-show conditions, deadlines and any fees.
- Breakfast availability, serving times, charge and rate-dependent inclusion.
- Pool opening hours, guest access, any charges, age/safety restrictions and maintenance closures.
- Free-parking availability/conditions, WiFi scope and laundry charges/turnaround.
- Any current security or electricity claims. None have been added without confirmation.

## Reviews and permissions
Provide genuine review text, reviewer display name, rating if present, date if known, source name and original URL if available. Confirm permission/source terms for publication. In src/content.mjs, a review must have verified:true, status:"approved" and permissionToPublish:true to render. An optional rating must be 1–5. An HTTPS source URL is linked when supplied; a source name may be used for permitted direct feedback. No reviews or scores are currently published; no scraping is performed.

## Photography
Confirm ownership or publication rights for all supplied images. Confirm the two shared bedroom images before assigning them as category-specific. See PHOTOGRAPHY_AUDIT.md for dimensions, reuse, quality limits and the replacement shot list.

## Content maintenance
- Central room data: src/assets/rooms.js. Add verified field names to verifiedFields only after hotel approval. Rate publication additionally requires rate.verified:true, a positive amount and NGN currency; use kind:"starting" only for an actual confirmed starting rate, otherwise "nightly".
- Room photos: photos[].categoryVerified. If verified photos exist, they replace illustrative fallback photos in that category. Give each photo meaningful alt text.
- Room amenities/features: each entry has label, optional icon and verified:true before being shown as a room fact. Hotel-level availability does not automatically prove a room-specific inclusion.
- Keep approval evidence/effective dates with hotel records and update verification.source/verifiedAt when confirming data.
- Unknown policy fields in src/content.mjs are deliberately null; current public wording directs guests to confirm them. Approved policy changes must also update the relevant FAQ/Contact copy.

No payments are collected or reservation guarantees issued by the website. Visitors send their enquiry in WhatsApp; the hotel confirms the final booking details.
