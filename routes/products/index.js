const express = require('express');

const { safePromise, logger, generateId } = require('../../utils');
const database = require('../../database');

const log = logger('route:auth', null);
const router = express.Router();

const { Products } = database.models;
// create new product
router.post('/new', async (req, res, next) => {
  const { title, description, price, quantity, type, thumbnail } = req.body;

  const [error, oldProduct] = await safePromise(Products.findOne({ title }));

  if (error) {
    log.error(error.message || error);
    return res.status(200).json({
      success: false,
      message: error.message || 'database error!',
      res: {},
    });
  }

  if (oldProduct) {
    return res.status(200).json({
      success: false,
      message: `Product with title: "${title}" already exists!`,
      res: {},
    });
  }

  const [newError, newProduct] = await safePromise(
    Products.create({
      ref_id: generateId('pro'),
      title,
      description,
      price,
      quantity,
      type,
      thumbnail,
      active: true,
    })
  );

  if (newError) {
    log.error(newError.message || newError);
    return res.status(200).json({
      success: false,
      message: newError.message || 'database error!',
      res: {},
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product created successfully',
    res: newProduct,
  });
});

// get all procusts
router.get('/', async (req, res, next) => {
  let [error, products] = await safePromise(Products.find({}));

  if (error) {
    log.error(error.message || error);
    return res.status(200).json({
      success: false,
      message: error.message || 'database error!',
      res: {},
    });
  }

  const formatted = {
    valueDeals: [],
    kidFriendly: [],
    milletAlternatives: [],
  };

  function formatType(str) {
    return (str.charAt(0).toLowerCase() + str.slice(1)).replace(' ', '');
  }

  products.forEach((product) => {
    const { ref_id, title, description, price, quantity, type, thumbnail } =
      product;
    formatted[formatType(type)].push({
      ref_id,
      title,
      description,
      price,
      quantity,
      type,
      thumbnail,
    });
  });

  return res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    res: formatted,
  });
});

// bulk create products - for initial data load
router.post('/new-bluk', async (req, res, next) => {
  let { products } = req.body;

  products = products.map((product) => {
    return {
      ...product,
      ref_id: generateId('pro'),
      active: true,
    };
  });

  const [error, result] = await safePromise(Products.insertMany(products));

  if (error) {
    log.error(error.message || error);
    return res.status(200).json({
      success: false,
      message: error.message || 'database error!',
      res: {},
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Products created in bulk successfully',
    res: result,
  });
});

module.exports = router;
