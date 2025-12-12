import { JSX } from 'react';
import { MainPage } from '../../pages/main-page/main-page';
import { FavoritesPage } from '../../pages/favourites-page/favourites-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FullOffer } from '../../types/offer';

type AppMainPageProps = {
  offers: FullOffer[];
};

function App({ offers }: AppMainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage />}
        />
        <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage offers={offers} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
