const { validationResult } = require('express-validator');

const fieldValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ err: errors.array(), user: null });
  }
  next();
};

module.exports = { fieldValidate };
