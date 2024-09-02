const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    response.status(400).json({ error: 'required property missing' });
  } else if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    response.status(400).json({ error: 'expected `username` to be unique' });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
};