export const party = {
  name: 'Aarav',
  age: '1',
  eventDate: '2026-11-15T17:00:00+05:30',
  celebrationTime: '5:00 PM onwards',
  dinnerTime: '5:00 PM onwards',
  venue: 'The Royal Garden',
  address: 'Bhopal, Madhya Pradesh, India',
  mapsQuery: 'The Royal Garden, Bhopal, Madhya Pradesh, India',
  whatsappMessage:
    'With the blessings of God and love of our family, join us for Aarav’s first birthday on Sunday, 15 November 2026 at 5:00 PM onwards at The Royal Garden, Bhopal.',
};

export function getPartyDay(eventDate: string) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(eventDate));
}

export function getPartyDateLabel(eventDate: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(eventDate));
}

export const galleryImages = [
  {
    src: 'postcard/birthday-photo-1.jpg',
    alt: 'A little explorer surrounded by safari animals',
    title: 'A little explorer',
    width: 7008,
    height: 4672,
  },
  {
    src: 'postcard/birthday-photo-2.jpg',
    alt: 'The birthday boy enjoying a playful animal-themed celebration',
    title: 'Wild at heart',
    width: 6000,
    height: 4000,
  },
  {
    src: 'postcard/birthday-photo-3.jpg',
    alt: 'A sweet birthday memory with a little safari explorer',
    title: 'Little moments',
    width: 7008,
    height: 4672,
  },
  {
    src: 'postcard/birthday-photo-4.jpg',
    alt: 'A joyful birthday portrait among jungle friends',
    title: 'Jungle joy',
    width: 7008,
    height: 4672,
  },
  {
    src: 'postcard/birthday-photo-5.jpg',
    alt: 'A favorite birthday celebration keepsake',
    title: 'Birthday keepsake',
    width: 7008,
    height: 4672,
  },
];
