import { CITIES_LOCATION, SortOffersType } from './const';
import { CityOffer, OffersList } from './types/offer';
import { SortOffer } from './types/sort';

const getCity = (cityName: string | undefined, cities: CityOffer[] = CITIES_LOCATION): CityOffer | undefined =>
  cities.find((item) => item.name === cityName);

const getOffersByCity = (cityName: string | undefined, offers: OffersList[]): OffersList[] => {
  if (!cityName) {
    return [];
  }

  return offers.filter((offer) => offer.city.name === cityName);
};

const sortOffersByType = (offers: OffersList[], type: SortOffer): OffersList[] => {
  const sortedOffers = [...offers];

  switch (type) {
    case 'PriceToHigh':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'PriceToLow':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'TopRated':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sortedOffers;
  }
};

export { getCity, getOffersByCity, sortOffersByType };

