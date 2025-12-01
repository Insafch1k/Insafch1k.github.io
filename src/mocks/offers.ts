import { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 8 }
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 8 },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: ['Heating', 'Wi-Fi', 'Washing machine', 'Towels', 'Coffee machine'],
    host: {
      name: 'Angelina',
      avatarUrl: '/img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['/img/apartment-01.jpg', '/img/apartment-02.jpg'],
    maxAdults: 4
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    description: 'Desc 2',
    bedrooms: 1,
    goods: ['Wi-Fi'],
    host: { name: 'Max', avatarUrl: '/img/avatar-max.jpg', isPro: false },
    images: ['/img/room.jpg'],
    maxAdults: 2
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'house',
    price: 132,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Cologne',
      location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
    },
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    description: 'Desc 3',
    bedrooms: 2,
    goods: ['Laptop friendly workspace'],
    host: { name: 'Mark', avatarUrl: '/img/avatar-angelina.jpg', isPro: true },
    images: ['/img/apartment-02.jpg'],
    maxAdults: 4
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'hotel',
    price: 180,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Brussels',
      location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 }
    },
    location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 },
    isFavorite: false,
    isPremium: true,
    rating: 5.0,
    description: 'Desc 4',
    bedrooms: 3,
    goods: ['Towels'],
    host: { name: 'Helen', avatarUrl: '/img/avatar-max.jpg', isPro: true },
    images: ['/img/apartment-03.jpg'],
    maxAdults: 6
  }
];
