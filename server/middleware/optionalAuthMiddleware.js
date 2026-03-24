import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next();
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (user) {
      req.user = user;
    }
  } catch {
  }
  next();
};

export { optionalAuthenticate };
