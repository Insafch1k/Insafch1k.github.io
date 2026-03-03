import ApiError from '../error/ApiError.js';
import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    next(ApiError.internal('Не удалось получить список отзывов'));
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user?.id;

    if (!comment || !rating) {
      return next(ApiError.badRequest('Некорректный comment или rating'));
    }
    if (!userId) {
      return next(ApiError.unauthorized('Пользователь не авторизован'));
    }

    const review = await Review.create({
      text: comment,
      rating,
      authorId: userId,
      OfferId: offerId,
    });

    return res.status(201).json(review);
  } catch (error) {
    next(ApiError.internal(`Не удалось добавить отзыв: ${error.message}`));
  }
};

export const getReviewsByOfferId = async (req, res, next) => {
  try {
    const { offerId } = req.params;

    const reviews = await Review.findAll({
      where: { OfferId: offerId },
      include: [{ model: User, as: 'author' }],
      order: [['publishDate', 'DESC']],
    });

    const adapted = reviews.map((review) => adaptReviewToClient(review));
    return res.status(200).json(adapted);
  } catch (error) {
    next(ApiError.internal('Не удалось получить отзывы по предложению'));
  }
};

