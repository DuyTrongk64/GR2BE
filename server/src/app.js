import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config.js';
import morganMiddleware from './middleware/morgan.middleware.js';
import logger from './utils/logger.js';
import errorHandlingMiddleware from './middleware/errorHandling.middleware.js';

import userRoutes from './routes/users.route.js';
import roomRoutes from './routes/rooms.route.js'
import authRoutes from './routes/auth.route.js'

const { URL } = config.env;
const app = express();
const corsOptions = { credentials: true, origin: URL || '*' };

app.use(morganMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rooms', roomRoutes);


app.use(errorHandlingMiddleware);
app.use('/healthcheck', function (req, res, next) {
  logger.info('This is a health check');
  res.send('This is heathcheck endpoint');
});

export default app;
