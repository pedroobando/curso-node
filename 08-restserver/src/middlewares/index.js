const validateField = require('./validate-field');
const validateJWT = require('./validate-jwt');
const validateRoll = require('./validate-roll');

module.exports = { ...validateField, ...validateJWT, ...validateRoll };
