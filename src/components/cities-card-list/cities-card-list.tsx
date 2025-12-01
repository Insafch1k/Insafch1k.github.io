import { JSX } from 'react';
import { OffersList, FullOffer } from '../../types/offer';
import { CitiesCard } from '../cities-card/cities-card';

type CitiesCardListProps = {
  offersList: (OffersList | FullOffer)[];
  className?: string;
  onListItemHover?: (offerId: string | undefined) => void;
};

function CitiesCardList({ offersList, className = "cities__places-list places__list tabs__content", onListItemHover }: CitiesCardListProps): JSX.Element {
  return (
    <div className={className}>
      {offersList.map((item) => (
        <div 
          key={item.id}
          onMouseEnter={() => onListItemHover && onListItemHover(item.id)}
          onMouseLeave={() => onListItemHover && onListItemHover(undefined)}
        >
           <CitiesCard
             id={item.id}
             title={item.title}
             type={item.type}
             price={item.price}
             previewImage={item.previewImage}
             isPremium={item.isPremium}
             rating={item.rating}
           />
        </div>
      ))}
    </div>
  );
}

export { CitiesCardList };
