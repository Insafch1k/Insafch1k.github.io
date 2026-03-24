import { Offer } from '../models/offer.js'
import ApiError from '../error/ApiError.js';
import { User } from '../models/user.js';
import { UserFavorite } from '../models/userFavorite.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        let favoriteIdSet = new Set();
        if (req.user) {
            const rows = await UserFavorite.findAll({
                where: { UserId: req.user.id },
                attributes: ['OfferId'],
            });
            favoriteIdSet = new Set(rows.map((row) => String(row.OfferId)));
        }
        const adaptedOffers = offers.map((offer) =>
            adaptOfferToClient(offer, {
                isFavorite: req.user ? favoriteIdSet.has(String(offer.id)) : false,
            }),
        );
        res.status(200).json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Не удалось получить список'))
    }
}

export {getAllOffers}

export async function createOffer(req, res, next) {
    try {
      const {
        title, description, publishDate, city,
        isPremium, rating, type, rooms, guests, price,
        features, commentsCount, latitude, longitude, userId
      } = req.body;
   
   
      if (!req.files?.previewImage || req.files.previewImage.length === 0) {
        return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
      }
   
   
      const previewImagePath = `/static/${req.files.previewImage[0].filename}`;
   
   
      let processedPhotos = [];
      if (req.files?.photos) {
        processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
      }
   
   
      let parsedFeatures = [];
      if (features) {
        try {
          parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
        } catch {
          parsedFeatures = features.split(',');
        }
      }
   
   
      const offer = await Offer.create({
        title,
        description,
        publishDate,
        city,
        previewImage: previewImagePath,
        photos: processedPhotos,
        isPremium,
        isFavorite: false,
        rating,
        type,
        rooms,
        guests,
        price,
        features: parsedFeatures,
        commentsCount,
        latitude,
        longitude,
        authorId: userId
      });
   
   
      return res.status(201).json(offer);
    } catch (error) {
      next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }

}

async function getFullOffer(req, res, next) {
  try {
      const { id } = req.params;
      const offer = await Offer.findByPk(id, {
          include: { model: User, as: 'author' }
      });

      if (!offer) {
          return next(ApiError.notFound('Offer not found'));
      }

      let isFavorite = false;
      if (req.user) {
        const row = await UserFavorite.findOne({
          where: { UserId: req.user.id, OfferId: offer.id },
        });
        isFavorite = Boolean(row);
      }

      const adaptedOffer = adaptFullOfferToClient(offer, { isFavorite });
      res.json(adaptedOffer);
  } catch (error) {
      next(ApiError.internal('Не удалось получить данные предложения: ' + error.message));
  }
}

async function getFavoriteOffers(req, res, next) {
    try {
        const offers = await req.user.getFavoriteOffers();
        const adaptedOffers = offers.map((offer) =>
            adaptOfferToClient(offer, { isFavorite: true }),
        );
        res.status(200).json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Не удалось получить избранные предложения'));
    }
}

const toggleFavorite = async (req, res, next) => {
    try {
      const { offerId, status } = req.params;
      const userId = req.user.id;

      const offer = await Offer.findByPk(offerId);
      if (!offer) {
      return next(ApiError.notFound('Предложение не найдено'));
      }

      if (status === '1') {
        await UserFavorite.findOrCreate({
          where: { UserId: userId, OfferId: offer.id },
        });
      } else {
        await UserFavorite.destroy({
          where: { UserId: userId, OfferId: offer.id },
        });
      }

      res.json(offer);
      
  } catch (error) {
      next(ApiError.internal('Ошибка при обновлении статуса избранного'));
    }
  };

export { getFullOffer, getFavoriteOffers, toggleFavorite };