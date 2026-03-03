import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(ApiError.internal('Не удалось получить список пользователей'));
  }
};

export const registration = async (req, res, next) => {
  try {
    const { email, password, userType, username } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'));
    }

    if (!req.file) {
      return next(ApiError.badRequest('Аватар обязателен для загрузки'));
    }

    const baseUrl = `${process.env.HOST}:${process.env.PORT || 5000}`;
    const avatarImage = `${baseUrl}/static/${req.file.filename}`;
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      userType,
      username,
      avatar: avatarImage,
      password: hashPassword,
    });

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatar,
        isPro: user.userType === 'pro',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    next(ApiError.internal('Ошибка регистрации'));
  }
};

