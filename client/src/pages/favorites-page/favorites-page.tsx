import { JSX } from 'react';
import { Logo } from '../../components/logo/logo';
import { CitiesCard } from '../../components/cities-card/cities-card';
import { useAppSelector } from '../../hooks'; 

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const favoritesByCity = favoriteOffers.reduce<Record<string, typeof favoriteOffers>>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) { acc[city] = []; }
    acc[city].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left"><Logo /></div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                    <div className="header__nav-link header__nav-link--profile">
                     <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                     <span className="header__user-name user__name">Myemail@gmail.com</span>
                     <span className="header__favorite-count">{favoriteOffers.length}</span>
                   </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length > 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(([city, offers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#"><span>{city}</span></a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offers.map((offer) => (
                        <CitiesCard 
                            key={offer.id} 
                            offer={offer} 
                            cardType="favorites"
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p>Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export { FavoritesPage };
