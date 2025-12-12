import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AppRoute } from '../../const';

type CitiesCardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  isPremium: boolean;
  rating: number;
  isFavorite: boolean;
  onHover?: (id: string | undefined) => void;
};

function CitiesCard({
  id,
  title,
  type,
  price,
  previewImage,
  isPremium,
  rating,
  isFavorite,
  onHover,
}: CitiesCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(isFavorite);
  const ratingWidth = `${(rating / 5) * 100}%`;

  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => onHover?.(id)}
      onMouseOut={() => onHover?.(undefined)}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isBookmarked ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={() => setIsBookmarked((prev) => !prev)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export { CitiesCard };
