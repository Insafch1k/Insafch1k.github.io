import { JSX } from "react";
import { OffersList } from "../../types/offer";
import { FavoriteCard } from "../favorite-card/favorite-card";

type FavoriteCardListProps = {
  offersList: OffersList[];
};

function FavoriteCardList({ offersList }: FavoriteCardListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <span className="locations__item-link">Paris</span>
          </div>
        </div>

        <div className="favorites__places">
          {offersList
            .filter((offer) => offer.isFavorite && offer.city.name === 'Paris')
            .map((offer) => (
              <FavoriteCard key={offer.id} {...offer} />
            ))}
        </div>
      </li>
    </ul>
  );
}

export { FavoriteCardList };
