const { connect, model } = require('mongoose');

const { MONGODB_URI } = require('../config');
const productsSchema = require('./models/products');

const opts = {
  bufferCommands: false,
  autoIndex: false,
};

module.exports = {
  connect: connect(`${MONGODB_URI}`, opts),
  models: {
    Products: model('products', productsSchema),
  },
};
