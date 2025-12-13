import { FullOffer } from '../types/offer';

export const offers: FullOffer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.86561, longitude: 2.350499, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine'],
    host: {
      name: 'Angelina',
      isPro: true,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'A quiet cozy and comfortable apartment in the heart of Paris.',
    images: [
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg',
      '/img/room.jpg',
      '/img/studio-01.jpg',
      '/img/apartment-01.jpg'
    ]
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
    location: { latitude: 48.86861, longitude: 2.342499, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 3.0,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Heating', 'Wi-Fi'],
    host: {
      name: 'Max',
      isPro: false,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Minimalistic room in the center.',
    images: [
      '/img/room.jpg',
      '/img/apartment-01.jpg',
      '/img/apartment-02.jpg',
      '/img/apartment-03.jpg'
    ]
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85961, longitude: 2.340499, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 5.0,
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Kitchen', 'Cable TV'],
    host: {
      name: 'Katerina',
      isPro: true,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'Wonderful view from the window.',
    images: ['/img/apartment-02.jpg']
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.85761, longitude: 2.358499, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Heating', 'Kitchen'],
    host: {
      name: 'Dmitry',
      isPro: true,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Modern apartment near the tower.',
    images: ['/img/apartment-03.jpg']
  },
  {
    id: '201',
    title: 'Small flat in the city center',
    type: 'room',
    price: 60,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 3.5,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Laptop workspace'],
    host: {
      name: 'Anne',
      isPro: false,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'Small but cozy.',
    images: ['/img/room.jpg']
  },
  {
    id: '202',
    title: 'Loft Studio in the Central Area',
    type: 'apartment',
    price: 95,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
    },
    location: { latitude: 52.3609553943508, longitude: 4.85309666406198, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Washing machine'],
    host: {
      name: 'Ben',
      isPro: true,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Stylish loft.',
    images: ['/img/apartment-01.jpg']
  },
  {
    id: '301',
    title: 'Historical Center Room',
    type: 'room',
    price: 75,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Cologne',
      location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
    },
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    bedrooms: 1,
    maxAdults: 1,
    goods: ['Breakfast'],
    host: {
      name: 'Hans',
      isPro: false,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Right in the historical center.',
    images: ['/img/room.jpg']
  },
  {
    id: '302',
    title: 'Modern Cologne Apartment',
    type: 'apartment',
    price: 110,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Cologne',
      location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
    },
    location: { latitude: 50.935361, longitude: 6.955974, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Parking'],
    host: {
      name: 'Greta',
      isPro: true,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'Modern and clean.',
    images: ['/img/apartment-02.jpg']
  },
  {
    id: '401',
    title: 'Brussels City Center',
    type: 'apartment',
    price: 140,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Brussels',
      location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 }
    },
    location: { latitude: 50.846557, longitude: 4.351697, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Kitchen'],
    host: {
      name: 'Jean',
      isPro: true,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Heart of Europe.',
    images: ['/img/apartment-03.jpg']
  },
  {
    id: '402',
    title: 'Cozy Room in Brussels',
    type: 'room',
    price: 65,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Brussels',
      location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 }
    },
    location: { latitude: 50.851557, longitude: 4.355697, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 3.8,
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Heating'],
    host: {
      name: 'Marie',
      isPro: false,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'Near Grand Place.',
    images: ['/img/room.jpg']
  },
  {
    id: '501',
    title: 'Hamburg Port View',
    type: 'apartment',
    price: 160,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 }
    },
    location: { latitude: 53.550341, longitude: 10.000654, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Balcony'],
    host: {
      name: 'Klaus',
      isPro: true,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Amazing view of the port.',
    images: ['/img/apartment-01.jpg']
  },
  {
    id: '502',
    title: 'Central Hamburg Flat',
    type: 'room',
    price: 55,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 }
    },
    location: { latitude: 53.555341, longitude: 10.005654, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 3.5,
    bedrooms: 1,
    maxAdults: 1,
    goods: ['Breakfast'],
    host: {
      name: 'Petra',
      isPro: false,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'Quiet and convenient.',
    images: ['/img/room.jpg']
  },
  {
    id: '601',
    title: 'Luxury Dusseldorf Apartment',
    type: 'apartment',
    price: 200,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Dusseldorf',
      location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 }
    },
    location: { latitude: 51.225402, longitude: 6.776314, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    bedrooms: 3,
    maxAdults: 6,
    goods: ['Sauna', 'Wi-Fi', 'Parking'],
    host: {
      name: 'Friedrich',
      isPro: true,
      avatarUrl: '/img/avatar-max.jpg'
    },
    description: 'Luxury living.',
    images: ['/img/apartment-02.jpg']
  },
  {
    id: '602',
    title: 'Business Room Dusseldorf',
    type: 'room',
    price: 90,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Dusseldorf',
      location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 }
    },
    location: { latitude: 51.230402, longitude: 6.780314, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    bedrooms: 1,
    maxAdults: 1,
    goods: ['Work desk', 'Wi-Fi'],
    host: {
      name: 'Julia',
      isPro: false,
      avatarUrl: '/img/avatar-angelina.jpg'
    },
    description: 'Perfect for business trips.',
    images: ['/img/room.jpg']
  }
];
