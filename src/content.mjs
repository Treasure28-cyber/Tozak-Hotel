export const hotel = {
  name: 'Tozak Hotel',
  phone: '0806 418 0488',
  internationalPhone: '+2348064180488',
  whatsapp: '2348064180488',
  address: 'Plot 25/27 Ekiugbo/Warri Road, Ekiugbo, Ughelli, Delta State',
  maps: 'https://www.google.com/maps/search/?api=1&query=Tozak+Hotel+Ekiugbo+Ughelli+Delta+State',
  // Confirm the current Google score before enabling it on the public website.
  rating: null,
  // The brief and supplied hotel listing disagree about complimentary breakfast.
  breakfast: 'Breakfast available',
  siteUrl: process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://tozak-hotel-ughelli.tuned-bloom-7490.chatgpt.site')
};

// Room categories come from the hotel listing PDF supplied by the user.
// Rates, exact image-to-category assignments, bed sizes and occupancy need hotel confirmation.
export const rooms = [
  { id: 'single-room', name: 'Single Room', note: "The room that gets out of your way", description: "Everything you need. Nothing you don’t. The room that lets you get on with your stay.", image: 'room-oak.jpg' },
  { id: 'double-deluxe', name: 'Double Deluxe', note: "Room to actually breathe", description: "More space, the same good value. The room you book when one night turns into two.", image: 'room-oak.jpg' },
  { id: 'executive-double', name: 'Executive Double', note: "Built for the work trip that earns a good night", description: "Long day. Early start tomorrow. The Executive Double is built for exactly this kind of trip.", image: 'room-twin.jpg' },
  { id: 'continental-suite', name: 'Continental Suite', note: "When the stay deserves more than ordinary", description: "When the occasion calls for more. The suite stay that makes the whole trip worth it.", image: 'room-twin.jpg' }
];

export const amenities = [
  { icon: 'pool', name: 'Outdoor pool', description: 'A refreshing change of pace, right here at the hotel.' },
  { icon: 'coffee', name: 'Breakfast available', description: 'Ask us about breakfast options, serving times and what is included in your stay.' },
  { icon: 'parking', name: 'Free parking', description: 'Bring your car and keep your arrival simple.' },
  { icon: 'wifi', name: 'Free WiFi', description: 'Stay connected while you settle in.' },
  { icon: 'snow', name: 'Air conditioning', description: 'Air-conditioned rooms for your comfort. Ask about availability during your stay.' },
  { icon: 'laundry', name: 'Laundry service', description: 'Travelling a little longer? Ask our team about laundry service and charges.' }
];

export const photos = [
  { file: 'pool-day.jpg', category: 'pool', title: 'A moment by the pool', alt: 'Tozak Hotel outdoor swimming pool with a green canopy and poolside seating' },
  { file: 'room-oak.jpg', category: 'rooms', title: 'Room to unwind', alt: 'A Tozak Hotel bedroom with a wooden bed frame, white bedding and armchairs' },
  { file: 'lounge.jpg', category: 'spaces', title: 'Meet. Sit. Stay a while.', alt: 'The hotel lounge with black and orange seating and a tiled floor' },
  { file: 'pool-night.jpg', category: 'pool', title: 'As evening settles in', alt: 'The illuminated outdoor pool at Tozak Hotel in the evening' },
  { file: 'courtyard.jpg', category: 'exterior', title: 'An easy afternoon', alt: 'Outdoor courtyard seating beside Tozak Hotel' },
  { file: 'room-twin.jpg', category: 'rooms', title: 'Inside the hotel', alt: 'A supplied hotel bedroom photograph showing two beds and bedside lamps' },
  { file: 'fitness.jpg', category: 'spaces', title: 'A look at the fitness space', alt: 'The supplied Tozak Hotel fitness room with treadmills and exercise equipment' },
  { file: 'bar.jpg', category: 'spaces', title: 'Around the hotel', alt: 'The bar shelves in a supplied Tozak Hotel photograph' },
  { file: 'garden.webp', category: 'exterior', title: 'Outside at Tozak', alt: 'The hotel grounds with a lawn, neighbouring buildings and a colourful inflatable slide' }
];

export const faqs = [
  ['How do I book a room?', 'Message us on WhatsApp with your dates and number of guests. Our team will confirm availability, your room options and the current rate before you book.'],
  ['Where is Tozak Hotel?', 'You’ll find us at Plot 25/27 Ekiugbo/Warri Road, Ekiugbo, Ughelli, Delta State, Nigeria. Open the map below for directions.'],
  ['Is breakfast included?', 'Breakfast is available. Please ask our team whether it is included in your chosen room rate, and confirm serving times when booking.'],
  ['What time can I check in or check out?', 'Please confirm check-in and checkout times with our team before arrival. If you need an early arrival or a late departure, include it in your enquiry.'],
  ['What is the cancellation policy?', 'Ask our team for the terms that apply to your booking, including deposits, payment and cancellation, before confirming your stay.'],
  ['Can I ask about a longer stay?', 'Of course. Send us your preferred dates and any special requests so we can discuss the room options with you.']
];

// Publish only authentic reviews with an attribution and original source URL.
export const reviews = [];
