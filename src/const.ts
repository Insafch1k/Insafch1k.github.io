import { CityOffer } from './types/offer';

const Setting = {
  rentOffersCount: 312,
} as const;

const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
} as const;

const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

const CITIES_LOCATION: CityOffer[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 12,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 12,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 12,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 12,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 12,
    },
  },
];

const SortOffersType = {
  Popular: 'Popular',
  PriceToHigh: 'Price: low to high',
  PriceToLow: 'Price: high to low',
  TopRated: 'Top rated first',
} as const;

const DEFAULT_CITY = 'Paris';

export {
  Setting,
  AppRoute,
  AuthorizationStatus,
  CITIES_LOCATION,
  SortOffersType,
  DEFAULT_CITY,
};
