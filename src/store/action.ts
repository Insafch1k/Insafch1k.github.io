import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList } from '../types/offer';

const changeCity = createAction<CityOffer>('offers/changeCity');
const offersCityList = createAction<OffersList[]>('offers/offersCityList');

export { changeCity, offersCityList };

