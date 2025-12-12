import { createReducer } from '@reduxjs/toolkit';
import { offersList } from '../mocks/offers-list';
import { changeCity, offersCityList } from './action';
import { getCity } from '../utils';
import { CITIES_LOCATION, DEFAULT_CITY } from '../const';
import { CityOffer, OffersList } from '../types/offer';

type OffersState = {
  city: CityOffer | undefined;
  offers: OffersList[];
};

const defaultCity = getCity(DEFAULT_CITY, CITIES_LOCATION) ?? CITIES_LOCATION[0];

const initialState: OffersState = {
  city: defaultCity,
  offers: offersList,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };

