import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { OffersList } from '../types/offer.js';
import {offersCityList, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData, updateOfferFavorite} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData, UserData} from '../types/user-data';
import {store} from './index';
import type { Review } from '../types/review.js'; 

export const clearErrorAction = createAsyncThunk(
   'clearError',
   () => {
     setTimeout(
       () => store.dispatch(setError(null)),
       TIMEOUT_SHOW_ERROR,
     );
   },
 );

export const fetchOffersAction = createAsyncThunk<void, undefined, {
 dispatch: AppDispatch;
 state: State;
 extra: AxiosInstance;
}>(
 'data/fetchOffers',
 async (_arg, {dispatch, extra: api}) => {
   dispatch(setOffersDataLoadingStatus(true));
   const {data} = await api.get<OffersList[]>(APIRoute.Offers);
   dispatch(setOffersDataLoadingStatus(false));
   dispatch(offersCityList(data));
 },
);

export const refreshOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/refreshOffers',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<OffersList[]>(APIRoute.Offers);
    dispatch(offersCityList(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/checkAuth',
   async (_arg, {dispatch, extra: api}) => {
     try {
       const {data} = await api.get<UserData>(APIRoute.Login);
       dispatch(setUserData(data));
       dispatch(requireAuthorization(AuthorizationStatus.Auth));
     } catch {
       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
       dispatch(setUserData(null));
     }
   },
 );

export const initAppAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'app/init',
  async (_, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      await dispatch(checkAuthAction());
      const { data } = await api.get<OffersList[]>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/login',
   async ({email, password}, {dispatch, extra: api}) => {
     const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
     saveToken(data.token);
     dispatch(setUserData(data));
     dispatch(requireAuthorization(AuthorizationStatus.Auth));
     await dispatch(refreshOffersAction());
     return data;
   },
 );

export const logoutAction = createAsyncThunk<void, undefined, {
 dispatch: AppDispatch;
 state: State;
 extra: AxiosInstance;
}>(
 'user/logout',
 async (_arg, {dispatch, extra: api}) => {
   await api.delete(APIRoute.Logout);
   dropToken();
   dispatch(setUserData(null));
   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
   await dispatch(refreshOffersAction());
 },
);

export const toggleFavoriteAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/toggleFavorite',
  async (offerId, {dispatch, getState, extra: api}) => {
    const state = getState();
    if (state.authorizationStatus !== AuthorizationStatus.Auth) {
      return;
    }
    const offer = state.offers.find((o) => o.id === offerId);
    if (!offer) {
      return;
    }
    const statusFlag: '0' | '1' = offer.isFavorite ? '0' : '1';
    await api.post(APIRoute.FavoriteStatus(offerId, statusFlag));
    dispatch(updateOfferFavorite({ id: offerId, isFavorite: statusFlag === '1' }));
  },
);

export const postCommentAction = createAsyncThunk<
  Review,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'comments/post',
  async ({offerId, comment, rating}, {extra: api, getState}) => {
    type PostReviewResponse = {
      id: string | number;
      text: string;
      rating: number;
      publishDate?: string | Date;
    };
    const { data } = await api.post<PostReviewResponse>(APIRoute.Comments(offerId), {comment, rating});
    const user = getState().user;
    if (!user) {
      throw new Error('Not authorized');
    }
    const date =
      typeof data.publishDate === 'string'
        ? data.publishDate
        : data.publishDate
          ? new Date(data.publishDate).toISOString()
          : new Date().toISOString();
    return {
      id: String(data.id),
      comment: data.text,
      rating: Number(data.rating),
      date,
      user: {
        name: user.name,
        avatarUrl: user.avatarUrl,
        isPro: user.isPro,
      },
    };
  },
);
