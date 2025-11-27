import { JSX } from "react";
import { useParams } from "react-router-dom";
import { OfferInsideItem } from "../../components/offer-inside-item/offer-inside-item";
import { CitiesCard } from "../../components/cities-card/cities-card";
import { FormRatingInput } from "../../components/form-rating-input/form-rating-input";
import { Logo } from "../../components/logo/logo";
import { FullOffer } from "../../types/offer";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { CommentForm } from "../../components/comment-form/comment-form";

type OfferProps = {
  offers: FullOffer[];
};

function OfferPage({ offers }: OfferProps): JSX.Element {
  const params = useParams();
  const offer = offers.find((item) => item.id === params.id);

  if (!offer) {
    return <NotFoundPage />;
  }

  const ratingWidth = `${(offer.rating / 5) * 100}%`;

  return (
    <div className="page">
      <header className="header">
        <div className="header__left">
          <Logo />
        </div>
      </header>

      <main className="page__main page__main--offer">
        {/* твой текущий JSX, но вместо offers[0] везде используется offer */}
        {/* ... галерея, Premium, title, rating, features, price, goods, host ... */}



        <section className="offer__map map"></section>
<section className="offer__reviews reviews">
          <h2 className="reviews__title">
            Reviews &middot; <span className="reviews__amount">1</span>
          </h2>

          <ul className="reviews__list">
            <li className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src="img/avatar-max.jpg"
                    width="54"
                    height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">Max</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: "80%" }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique
                  lightness of Amsterdam.
                </p>
                <time className="reviews__time" dateTime="2019-04-24">
                  April 2019
                </time>
              </div>
            </li>
          </ul>

          <CommentForm />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offers.slice(1, 4).map((item) => (
                <CitiesCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  type={item.type}
                  price={item.price}
                  isPremium={item.isPremium}
                  previewImage={item.images[0]}
                  rating={item.rating}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };
