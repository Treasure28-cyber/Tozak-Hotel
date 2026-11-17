const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const url = value => {try {const parsed=new URL(value);return parsed.protocol==='https:'?parsed.href:null;}catch{return null;}};
export const publishedReviews = reviews => reviews.filter(review=>review && review.verified===true && review.status==='approved' && review.permissionToPublish===true && typeof review.text==='string' && review.text.trim() && typeof review.author==='string' && review.author.trim() && ((typeof review.sourceName==='string' && review.sourceName.trim()) || url(review.sourceUrl)));
export function renderReviews(reviews) {
 const published=publishedReviews(reviews);
 if(!published.length) return '';
 return `<section class="guest-reviews section" aria-labelledby="reviews-title"><div class="container"><p class="eyebrow">Guest experiences</p><h2 id="reviews-title">The stay, in their words.</h2><div class="review-grid">${published.map(review=>{
 const source=url(review.sourceUrl);
 const rating=typeof review.rating==='number' && review.rating>=1 && review.rating<=5 ? `<p class="review-rating" aria-label="Rated ${review.rating} out of 5"><span aria-hidden="true">★</span> ${review.rating}/5</p>`:'';
 const date=/^\d{4}-\d{2}-\d{2}$/.test(review.date||'') && !Number.isNaN(Date.parse(review.date)) && new Date(review.date+'T12:00:00Z').toISOString().slice(0,10)===review.date ? `<time datetime="${esc(review.date)}">${esc(new Date(review.date+'T12:00:00Z').toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'}))}</time>`:'';
 return `<figure class="review-card">${rating}<blockquote><p>${esc(review.text)}</p></blockquote><figcaption><strong>${esc(review.author)}</strong><div>${source?`<a href="${esc(source)}" target="_blank" rel="noopener noreferrer">${esc(review.sourceName||'Original review')}</a>`:`<span>${esc(review.sourceName)}</span>`}${date}</div></figcaption></figure>`;
 }).join('')}</div></div></section>`;
}
