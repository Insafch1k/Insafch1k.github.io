import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js';
import { router } from './routes/index.js'
import errorMiddleware from './middleware/ErrorHandlingMiddleware.js'
import { fileURLToPath } from 'url';
import path from 'path';
import { Review } from './models/review.js';
import { initAssociations } from './models/associations.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

const clientPublicImg = path.resolve(__dirname, '..', 'client', 'public', 'img');
const serverStaticDir = path.resolve(__dirname, 'static');
const swaggerPath = path.resolve(__dirname, '..', 'docs', 'swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

app.use(cors());
app.use(express.json());
app.use('/static', express.static(serverStaticDir));
app.use('/static', express.static(clientPublicImg));
app.use('/img', express.static(clientPublicImg));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        initAssociations();
        await sequelize.sync();
        await Review.sync({ alter: true });
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start ();
