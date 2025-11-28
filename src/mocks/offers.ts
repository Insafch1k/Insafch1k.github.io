import { FullOffer } from "../types/offer";

const offers: FullOffer[] = [
  {
    id: 'bbb06a0e-3f92-446d-9a68-cb64b5d38e2b',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 370,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.9,
    description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery.',
    bedrooms: 2,
    goods: [
      'Heating',
      'Wi‑Fi',
      'Fridge',
      'Laptop friendly workspace',
      'Coffee machine',
    ],
    host: {
      name: 'Insaf',
      avatarUrl: '/img/avatar-insaf.png',
      isPro: true,
    },
    images: [
      '/img/room.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
      '/img/studio-01.jpg',
      '/img/studio-photos.jpg',
    ],
    maxAdults: 3,
  },

  {
    id: '1',
    title: 'Cozy studio in city center',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
    description: 'Small but cozy studio near the old town.',
    bedrooms: 1,
    goods: ['Wi‑Fi', 'Kitchen', 'Washer'],
    host: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      '/img/studio-01.jpg',
      '/img/room-small.jpg',
      '/img/room.jpg',
    ],
    maxAdults: 2,
  },

  {
    id: '2',
    title: 'Family house with garden',
    type: 'house',
    price: 240,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    description: 'Spacious house with private garden and parking.',
    bedrooms: 3,
    goods: ['Wi‑Fi', 'Kitchen', 'Dishwasher', 'Baby seat'],
    host: {
      name: 'Sarah',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: true,
    },
    images: [
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
    ],
    maxAdults: 5,
  },

  {
    id: '3',
    title: 'Modern hotel room',
    type: 'hotel',
    price: 90,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    description: 'Comfortable room in a modern hotel close to city attractions.',
    bedrooms: 1,
    goods: ['Wi‑Fi', 'Breakfast', 'Air conditioning'],
    host: {
      name: 'Hotel staff',
      avatarUrl: '/img/avatar-max.jpg',
      isPro: false,
    },
    images: [
      '/img/room-small.jpg',
      '/img/room.jpg',
      '/img/studio-photos.jpg',
    ],
    maxAdults: 2,
  },
];

export { offers };
