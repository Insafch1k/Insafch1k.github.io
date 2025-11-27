import { FullOffer } from "../types/offer";

const offers: FullOffer[] = [
  {
    id: 'bbb06a0e-3f92-446d-9a68-cb64b5d38e2b',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 370,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
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
      name: 'Angelina',
      avatarUrl: 'avatar-angelina.jpg',
      isPro: true,
    },
    images: ['20.jpg', '17.jpg', '16.jpg', '15.jpg', '12.jpg', '7.jpg'],
    maxAdults: 3,
  },

  {
    id: '1',
    title: 'Cozy studio in city center',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.930361,
      longitude: 6.945974,
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
      avatarUrl: 'avatar-max.jpg',
      isPro: false,
    },
    images: ['studio-1.jpg', 'studio-2.jpg', 'studio-3.jpg'],
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
      latitude: 52.36954,
      longitude: 4.914976,
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
      avatarUrl: 'avatar-sarah.jpg',
      isPro: true,
    },
    images: ['house-1.jpg', 'house-2.jpg', 'house-3.jpg'],
    maxAdults: 5,
  },

  {
    id: '3',
    title: 'Modern hotel room',
    type: 'hotel',
    price: 90,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.849557,
      longitude: 4.364697,
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
      avatarUrl: 'avatar-hotel.jpg',
      isPro: false,
    },
    images: ['hotel-1.jpg', 'hotel-2.jpg'],
    maxAdults: 2,
  },
];

export { offers };
