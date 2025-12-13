import { createReducer } from '@reduxjs/toolkit';
import { offers as initialOffers } from '../mocks/offers'; 
import { getCity } from '../utils';
import { changeCity, offersCityList, toggleFavorite } from './action';
import { FullOffer } from '../types/offer';

const FAVORITES_KEY = 'six-cities-favorites';

const getFavoriteIds = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveFavoriteIds = (ids: string[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
};

const getInitializedOffers = () => {
  const favoriteIds = getFavoriteIds();
  const favoritesSet = new Set(favoriteIds.map(id => String(id)));
  
  return initialOffers.map((offer) => ({
    ...offer,
    isFavorite: favoritesSet.has(String(offer.id))
  }));
};

const initialState = {
  city: getCity('Paris'),
  offers: getInitializedOffers(), 
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      const favoriteIds = getFavoriteIds();
      const favoritesSet = new Set(favoriteIds.map(id => String(id)));

      const baseOffers = (action.payload as FullOffer[]).length > 0 
        ? action.payload as FullOffer[] 
        : initialOffers;

      state.offers = baseOffers.map((offer) => ({
        ...offer,
        isFavorite: favoritesSet.has(String(offer.id))
      }));
    })
    .addCase(toggleFavorite, (state, action) => {
      const offerId = String(action.payload);
      
      const offer = state.offers.find((o) => String(o.id) === offerId);

      if (offer) {
        offer.isFavorite = !offer.isFavorite;

        const currentFavorites = state.offers
          .filter((o) => o.isFavorite)
          .map((o) => String(o.id));

        saveFavoriteIds(currentFavorites);
      }
    });
});

export { reducer };
