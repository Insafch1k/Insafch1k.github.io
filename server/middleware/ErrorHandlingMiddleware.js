import ApiError from '../error/ApiError.js';

const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({ message: 'Unexpected server error' });
};

export default errorHandlingMiddleware;

