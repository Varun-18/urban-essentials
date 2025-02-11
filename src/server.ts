import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';

import router from 'routes';

const app = express();

dotenv.config();

/**
 * view engine
 */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares

/**
 * Security middleware to set various HTTP headers
 */
app.use(helmet());

/**
 * Cookie parser middleware
 */
app.use(cookieParser());

/**
 * The middleware for handling cross origin resource sharing
 */
app.use(cors({ credentials: true, origin: '*' }));

/**
 * compression middleware for compressing the response body
 */
app.use(
  compression({
    threshold: 1024,
    level: 6,
  })
);

/**
 * Logger for production
 * TODO : configure for production using env
 */
app.use(morgan('dev'));

/**
 * Middleware for parsing the json payload
 * Maximum payload upto 5mb can pass
 */
app.use(
  express.json({
    limit: '5mb',
    strict: true,
  })
);

/**
 * Parse URL encoded bodies
 * To get the URL Encoded form data
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Rate limitter for limiting the number of request every 15 mins.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests, please try again later.',
  statusCode: 429,
  headers: true,
});
app.use(limiter);

/**
 * Router for custom configurations
 */
app.use('/', router);

const connectToDatabase = async (port: string | number) => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log(
      `Server is running on ${process.env.MODE === 'prod' ? 'https://urban-essentials.onrender.com' : `http://localhost:${port}`}`
    );
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

app.listen(process.env.PORT || 5000, async () => {
  connectToDatabase(process.env.PORT || 5000);
});
