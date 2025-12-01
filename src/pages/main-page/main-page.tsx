import { JSX, useState } from 'react';
import { Logo } from '../../components/logo/logo';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Map } from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../components/cities-list/cities-list';
import { getOffersByCity, sortOffersByType } from '../../utils';
import { SortOptions } from '../../components/sort-options/sort-options';
import { SortOffer } from '../../types/sort';
import { SortOffersType } from '../../const';
import { OffersList, FullOffer } from '../../types/offer';

function MainPage(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const offersList = useAppSelector((state) => state.offers);
  
  const selectedCityOffers = getOffersByCity(selectedCity?.name, offersList);
  const rentalOffersCount = selectedCityOffers.length;
  
  const [activeSort, setActiveSort] = useState<SortOffer>(SortOffersType.Popular);

  const [selectedOffer, setSelectedOffer] = useState<OffersList | FullOffer | undefined>(undefined);

  const sortedOffers = sortOffersByType(selectedCityOffers, activeSort);

  const handleListItemHover = (offerId: string | undefined) => {
    if (!offerId) {
        setSelectedOffer(undefined);
        return;
    }
    const currentOffer = offersList.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

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
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
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
              <b className="places__found">{rentalOffersCount} places to stay in {selectedCity?.name}</b>
              
              <SortOptions activeSorting={activeSort} onChange={(newSorting) => setActiveSort(newSorting)} />
              
              <CitiesCardList 
                  offersList={sortedOffers} 
                  onListItemHover={handleListItemHover}
              />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                 {selectedCity && <Map city={selectedCity} points={sortedOffers} selectedPoint={selectedOffer} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };
