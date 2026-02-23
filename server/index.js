import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './config/database.js';
import './models/user.js';
import './models/offer.js';
import './models/review.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Rental-service server is running');
});

app.use('/', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();

