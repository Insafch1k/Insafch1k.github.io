import { User } from './user.js';
import { Offer } from './offer.js';
import { UserFavorite } from './userFavorite.js';

function initAssociations() {
  User.belongsToMany(Offer, {
    through: UserFavorite,
    as: 'favoriteOffers',
    foreignKey: 'UserId',
    otherKey: 'OfferId',
  });
  Offer.belongsToMany(User, {
    through: UserFavorite,
    as: 'favoritedBy',
    foreignKey: 'OfferId',
    otherKey: 'UserId',
  });
}

export { initAssociations };
