require('dotenv').config();

const { PORT, PROTOCOL, DOMAIN, MONGODB_URI } = process.env;

const expo = {
  PORT,
  PROTOCOL,
  DOMAIN,
  MONGODB_URI,
};

Object.keys(expo).forEach((key) => {
  if (!expo[key]) throw new Error(`⚠️ [Blog] Missing ${key} in .env file`);
});

module.exports = expo;
