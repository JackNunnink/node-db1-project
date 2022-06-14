const Accounts = require('./accounts-model.js');
const db = require('../../data/db-config.js');

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    error.message = 'Name and budget are required';
  } else if (typeof name !== 'string') {
    error.message = 'Name of account must be a string';
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'Name of account must be between 3 and 100';
  } else if (typeof budget !== 'number' || !isNaN(budget)) {
    error.message = 'Budget of account must be a number';
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'Budget of account too large or too small';
  }

  if(error.message) {
    next(error);
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first();
    if (existing) {
      const error = { status: 400, message: 'That name is taken' };
      next(error);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
