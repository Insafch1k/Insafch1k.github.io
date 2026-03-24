import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class UserFavorite extends Model {}

UserFavorite.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'users', key: 'id' },
    },
    OfferId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'offers', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'UserFavorite',
    tableName: 'user_favorites',
    timestamps: false,
  },
);

export { UserFavorite };
