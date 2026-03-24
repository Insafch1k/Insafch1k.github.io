import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.js';
import { Offer } from './offer.js';



class Review extends Model {}


Review.init({
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [5, 1024] }
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 1, max: 5 }
  }
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'reviews'
});


Review.belongsTo(User, { as: 'author', foreignKey: { allowNull: false } });
Review.belongsTo(Offer, { foreignKey: { allowNull: false } });


export {Review};
