import { OffersList } from '../types/offer';

export const offersList: OffersList[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
    },
    location: { latitude: 52.3609553943508, longitude: 4.85309666406198, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 3.0
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
    },
    location: { latitude: 52.3909553943508, longitude: 4.929309666406198, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 5.0
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
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0
  },
  {
    id: '5',
    title: 'Small flat in the city center',
    type: 'room',
    price: 60,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.86561, longitude: 2.355499, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 3.5
  },
  {
    id: '6',
    title: 'Loft Studio in the Central Area',
    type: 'apartment',
    price: 95,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Brussels',
      location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 }
    },
    location: { latitude: 50.846557, longitude: 4.351697, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.5
  },
  {
    id: '8',
    title: 'Modern Brussels Apartment',
    type: 'apartment',
    price: 110,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Brussels',
      location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 }
    },
    location: { latitude: 50.851557, longitude: 4.355697, zoom: 16 },
    isFavorite: false,
    isPremium: true,
    rating: 4.9
  },
  {
    id: '7',
    title: 'White castle',
    type: 'apartment',
    price: 180,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Cologne',
      location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
    },
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0
  },
  {
    id: '9',
    title: 'Historical Center Room',
    type: 'room',
    price: 75,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Cologne',
      location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
    },
    location: { latitude: 50.935361, longitude: 6.955974, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 4.0
  },
  {
    id: '10',
    title: 'Spacious Family Apartment',
    type: 'apartment',
    price: 140,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 }
    },
    location: { latitude: 53.550341, longitude: 10.000654, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 4.7
  },
  {
    id: '11',
    title: 'Port View Studio',
    type: 'apartment',
    price: 90,
    previewImage: '/img/studio-01.jpg',
    city: {
      name: 'Hamburg',
      location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 }
    },
    location: { latitude: 53.555341, longitude: 10.005654, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 4.2
  },
  {
    id: '12',
    title: 'Luxury Flat Dusseldorf',
    type: 'apartment',
    price: 200,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Dusseldorf',
      location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 }
    },
    location: { latitude: 51.225402, longitude: 6.776314, zoom: 16 },
    isFavorite: true,
    isPremium: true,
    rating: 5.0
  },
  {
    id: '13',
    title: 'Cheap Room near Rhine',
    type: 'room',
    price: 45,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Dusseldorf',
      location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 }
    },
    location: { latitude: 51.230402, longitude: 6.780314, zoom: 16 },
    isFavorite: false,
    isPremium: false,
    rating: 3.8
  }
];
