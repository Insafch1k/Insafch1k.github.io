import { OffersList } from '../types/offer';

export const offersList: OffersList[] = [
  // Paris
  {
    id: 'paris-1',
    title: 'Wood and stone place',
    type: 'apartment',
    price: 370,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.86861,
      longitude: 2.342499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.9,
  },
  {
    id: 'paris-2',
    title: 'Loft with Seine view',
    type: 'apartment',
    price: 220,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.85361,
      longitude: 2.349499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.6,
  },
  {
    id: 'paris-3',
    title: 'Charming studio near Louvre',
    type: 'studio',
    price: 150,
    previewImage: '/img/studio-01.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.86061,
      longitude: 2.337499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
  },

  // Cologne
  {
    id: 'cologne-1',
    title: 'Cozy studio near river',
    type: 'apartment',
    price: 120,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.9435,
      longitude: 6.9703,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.2,
  },
  {
    id: 'cologne-2',
    title: 'Central apartment with balcony',
    type: 'apartment',
    price: 180,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.9415,
      longitude: 6.9513,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7,
  },
  {
    id: 'cologne-3',
    title: 'Spacious family flat',
    type: 'apartment',
    price: 200,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.9475,
      longitude: 6.9653,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
  },

  // Brussels
  {
    id: 'brussels-1',
    title: 'Modern flat in center',
    type: 'apartment',
    price: 210,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.8563,
      longitude: 4.3617,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
  },
  {
    id: 'brussels-2',
    title: 'Townhouse with patio',
    type: 'house',
    price: 260,
    previewImage: '/img/room-small.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.8483,
      longitude: 4.3417,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
  },
  {
    id: 'brussels-3',
    title: 'Quiet studio near park',
    type: 'studio',
    price: 140,
    previewImage: '/img/studio-photos.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.8523,
      longitude: 4.3557,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
  },

  // Amsterdam (одна рабочая карточка с подробным оффером)
  {
    id: 'bbb06a0e-3f92-446d-9a68-cb64b5d38e2b', // совпадает с FullOffer
    title: 'Wood and stone place',
    type: 'apartment',
    price: 370,
    previewImage: '/img/apartment-01.jpg',
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
    isFavorite: false,
    isPremium: false,
    rating: 4.9,
  },
  {
    id: 'amsterdam-2',
    title: 'Canal view apartment',
    type: 'apartment',
    price: 200,
    previewImage: '/img/studio-01.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
  },
  {
    id: 'amsterdam-3',
    title: 'Modern loft in Jordaan',
    type: 'apartment',
    price: 240,
    previewImage: '/img/apartment-02.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3659553943508,
      longitude: 4.87909666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
  },

  // Hamburg
  {
    id: 'hamburg-1',
    title: 'Quiet house with garden',
    type: 'house',
    price: 260,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13,
      },
    },
    location: {
      latitude: 53.5551,
      longitude: 10.0037,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
  },
  {
    id: 'hamburg-2',
    title: 'Loft near Elbe',
    type: 'apartment',
    price: 190,
    previewImage: '/img/apartment-03.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13,
      },
    },
    location: {
      latitude: 53.5481,
      longitude: 9.9837,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
  },
  {
    id: 'hamburg-3',
    title: 'Budget room in hostel',
    type: 'hotel',
    price: 80,
    previewImage: '/img/room-small.jpg',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 13,
      },
    },
    location: {
      latitude: 53.5591,
      longitude: 9.9997,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
  },

  // Dusseldorf
  {
    id: 'dusseldorf-1',
    title: 'Top rated downtown room',
    type: 'hotel',
    price: 150,
    previewImage: '/img/room-small.jpg',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.2317,
      longitude: 6.7835,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.7,
  },
  {
    id: 'dusseldorf-2',
    title: 'Riverside apartment',
    type: 'apartment',
    price: 170,
    previewImage: '/img/apartment-01.jpg',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.2207,
      longitude: 6.7705,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.4,
  },
  {
    id: 'dusseldorf-3',
    title: 'Studio near old town',
    type: 'studio',
    price: 110,
    previewImage: '/img/studio-01.jpg',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.2297,
      longitude: 6.7805,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
  },
];
