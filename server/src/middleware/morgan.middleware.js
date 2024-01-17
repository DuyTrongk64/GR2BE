import morgan from 'morgan';
import logger from '../utils/logger.js';

const stream = {
  // Use the http severity
  write: (message) => {
    const data = JSON.parse(message);
    const sendData = { ...data, message: 'Incoming request' };
    logger.http(sendData);
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)),
    });
  },
  { stream, skip },
);

export default morganMiddleware;
