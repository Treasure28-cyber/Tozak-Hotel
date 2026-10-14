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
  { id: 'single-room', name: 'Single Room', note: 'For your own little retreat', description: 'A room to settle into after a day in Ughelli. Ask our team about the current room setup and availability for your dates.', image: 'room-oak.jpg' },
  { id: 'double-deluxe', name: 'Double Deluxe', note: 'Make yourself comfortable', description: 'Take your time and make yourself at home. Our team can help you choose a Double Deluxe room for your stay.', image: 'room-oak.jpg' },
  { id: 'executive-double', name: 'Executive Double', note: 'A stay at your own pace', description: 'Visiting for work or a few days away? Enquire about our Executive Double rooms and let us help you plan your visit.', image: 'room-twin.jpg' },
  { id: 'continental-suite', name: 'Continental Suite', note: 'Something a little different', description: 'Explore a suite stay at Tozak. Message us for the current suite features, photographs and a direct quote.', image: 'room-twin.jpg' }
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
