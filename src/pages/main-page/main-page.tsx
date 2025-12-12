import { JSX, useState } from 'react';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Logo } from '../../components/logo/logo';
import { Map } from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../components/cities-list/cities-list';
import { SortOptions } from '../../components/sort-options/sort-options';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOffer } from '../../types/sort';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const offersList = useAppSelector((state) => state.offers);

  const [activeSort, setActiveSort] = useState<SortOffer>('Popular');
  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>(undefined);

  const selectedCityOffers = getOffersByCity(selectedCity?.name, offersList);
  const sortedOffers = sortOffersByType(selectedCityOffers, activeSort);
  const rentalOffersCount = selectedCityOffers.length;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {rentalOffersCount} places to stay in {selectedCity?.name ?? '...'}
              </b>
              <SortOptions activeSorting={activeSort} onChange={(newSort) => setActiveSort(newSort)} />
              <CitiesCardList
                offersList={sortedOffers}
                onListItemHover={(offerId) => setSelectedOfferId(offerId)}
              />
            </section>
            <div className="cities__right-section">
              {selectedCity ? (
                <Map
                  className="cities__map"
                  city={selectedCity.location}
                  offers={selectedCityOffers}
                  selectedOfferId={selectedOfferId}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };