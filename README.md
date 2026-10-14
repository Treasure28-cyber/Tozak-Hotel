# Tozak Hotel

Six complete, responsive pages built with plain HTML, CSS and JavaScript. No runtime packages, framework or UI library. Each route is an actual HTML page; the site works on static hosting.

## Preview and edit

- `npm run dev` builds and serves the website at **http://localhost:4174**.
- `npm run build` regenerates all pages into `dist/`.
- `npm run check` checks routes, local links, assets, metadata and booking validation.

Use `src/content.mjs` to edit the hotel’s contact details, amenities, room categories, gallery and FAQs. Page templates live in `scripts/build.mjs`. Styles and interactions live in `src/assets/styles.css`, `src/assets/app.js` and `src/assets/booking.js`. Run the build after edits. Do not edit the generated HTML as a source of truth.

Routes: `/`, `/rooms/`, `/facilities/`, `/gallery/`, `/about/`, `/contact/`. A custom 404 page is included.

## Push to GitHub and deploy to Vercel

1. Push the project to your chosen GitHub repository, excluding ignored files.
2. Import the repository in Vercel. Choose **Other** for the framework and the repository root as the root directory.
3. The included `vercel.json` uses `npm run build && npm run check`, serves `dist`, and skips dependency installation. The build uses only Node.js built-ins.
4. Future pushes automatically rebuild the site.

Vercel’s production-domain environment variable sets the canonical URLs, Open Graph image URLs and sitemap. For a custom domain, set `SITE_URL` to the full website origin, without a trailing slash, and redeploy. Outside Vercel, set `SITE_URL` explicitly when building for another host. The default origin is the private Sites preview.

You can also upload `dist` to any static host. Netlify, Cloudflare Pages and GitHub Pages all support static websites; GitHub Pages needs a custom domain or root-level hosting because asset paths begin at `/`.

## Booking and forms

Every booking link uses WhatsApp number **2348064180488**, supplied in the brief. Confirm this number is connected to the hotel’s WhatsApp account before a public launch.

The home enquiry card validates dates and guests, then opens a prefilled WhatsApp message. The contact form validates name, phone/email and any dates, then provides a **Continue to WhatsApp** link. The visitor presses **Send** in WhatsApp. Neither form pretends to submit to a server or reserve a room. No backend or payment collection is included. Enquiries are not stored on this website.

Mobile navigation and the gallery use native modal dialogs with keyboard focus containment and Escape dismissal. The photo viewer supports left/right arrow keys, closes with Escape and restores focus. Gallery filters announce photograph counts. Contact maps load only when a visitor chooses to show them.

## Brand and photography

Original SVG logo assets are in `src/assets/brand`: dark header logo, light footer logo, and compact arch/T monogram. The logo was designed specifically for this project; no hotel star classification is implied.

Hotel photos were supplied in Downloads. Original files are retained in `src/assets/originals/` and excluded from the deployed assets. The 400×400 pool photo has an AI-assisted 1254×1254 enhancement, converted to WebP for the home hero. The gallery retains the original photograph. Check the enhanced photo against the property before a public launch; AI restoration can reconstruct small details. Higher-resolution originals are preferred for other small photos.

Design references were used for structure and inspiration, rather than copied. The site uses an original ivory, teal and gold direction with serif headings, an enquiry form beside the hero, asymmetrical photography and six distinct page layouts. See `DESIGN.md` for the creative brief and prompts.

## Content decisions and confirmation

- Breakfast is **available; guests confirm inclusion when booking**, as explicitly selected by the user.
- Room names come from the supplied Tozak hotel listing PDF: Single Room, Double Deluxe, Executive Double and Continental Suite. The hotel should confirm current categories and exact photo assignments.
- No published rates, occupancy, bed sizes, check-in hours, cancellation fees or payment promises were invented. Guests ask the hotel for the current details.
- No invented reviews or ratings appear. The brief’s Google rating/count needs current verification before publication.
- No unofficial email address or social profiles were added.
- The gallery can show supplied photographs of additional hotel spaces without promising their current operation as bookable amenities.

The private Sites preview is separate from a public hotel launch. Review hotel facts and photos before making the website public.

## Verification

The automated checks cover all six routes, local file/anchor integrity, metadata, form labels, valid WhatsApp links, all nine gallery photographs, and booking-date/contact validation. JavaScript syntax is also checked. Responsive CSS covers compact phones, larger phones, tablets and desktop; reduced-motion preferences are respected.

No browser was connected during this build, so browser screenshots and hands-on mobile interaction checks remain unverified. Open the local preview to review the final rendering.

Development-only reference rendering/conversion scripts use image/PDF packages already installed in the adjacent Carlaw project. They are not required for `build`, `check`, `dev` or deployment.
