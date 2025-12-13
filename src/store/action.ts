import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList, FullOffer } from '../types/offer';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers
}));

export const toggleFavorite = createAction('offers/toggleFavorite', (offerId: string) => ({
  payload: offerId
}));
