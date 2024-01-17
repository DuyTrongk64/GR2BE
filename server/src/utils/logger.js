import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENVIROMENT || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const consoleFormat = {
  info: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.errors({ stack: true }),
    format,
  ),
  http: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.method} ${info.status} ${info.url} ${info.response_time} ${info.content_length}`,
    ),
  ),
  error: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      (error) => `${error.timestamp} ${error.level}: ${error.stack}`,
    ),
  ),
};

const jsonFileFormat = winston.format.combine(winston.format.json());

const filter = {
  info: winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
  }),
  error: winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
  }),
  http: winston.format((info, opts) => {
    return info.level === 'http' ? info : false;
  }),
};

const transports = [
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(filter.info(), consoleFormat.info),
  }),
  new winston.transports.Console({
    level: 'http',
    format: winston.format.combine(filter.http(), consoleFormat.http),
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
  new winston.transports.File({
    filename: 'logs/info.log',
    level: 'info',
    format: winston.format.combine(filter.info()),
  }),
  new winston.transports.File({
    filename: 'logs/http.log',
    level: 'http',
    format: winston.format.combine(filter.http(), jsonFileFormat),
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  handleExceptions: true,
  handleRejections: true,
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
  exitOnError: false,
});

process.on('uncaughtException', (error) => {
  logger.error({
    statusCode: 500,
    name: 'UncaughtException',
    message: 'Uncaught exception occurred!',
    stack: error.stack,
  });
});

process.on('unhandledRejection', (error) => {
  logger.error({
    statusCode: 500,
    name: 'UnhandledRejection',
    message: 'Unhandled Rejection occurred!',
    stack: error.stack,
  });
});

const customLogger = winston.createLogger({
  level: 'error',
  format: consoleFormat.error,
  transports: [
    new winston.transports.Console(consoleFormat.error),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(filter.error(), jsonFileFormat),
    }),
  ],
});

// Override logger
logger.error = function (error) {
  // Customize the error handling and logging here
  customLogger.error({
    statusCode: error.statusCode,
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
};

export default logger;
