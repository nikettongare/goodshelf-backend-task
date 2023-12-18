const cors = require('./cors');
const requestLogger = require('./req-logger');
const database = require('../database');

// routes
const indexRouter = require('../routes');
const productsRouter = require('../routes/products');

const { safePromise, logger } = require('../utils');
const log = logger('app:boot', null);

module.exports = async (app) => {
  // enable cors
  cors(app);

  // request logger
  app.use(requestLogger);

  // routes
  app.use('/', indexRouter);
  app.use('/products', productsRouter);

  // database connection
  const [error] = await safePromise(database.connect);

  if (error) {
    log.error(error.message || error);
    throw new Error('Unable to connect to database!');
  } else  {
    log.info("MongoDB connected!");
  }
};
