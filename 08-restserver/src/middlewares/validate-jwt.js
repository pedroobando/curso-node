const { request, response } = require('express');

const { verifyToken } = require('../helpers/generar-jwt');

const validateJWT = async (req = request, res = response, next) => {
  try {
    const authHeader = req.headers.authorization || null;

    if (!authHeader) throw new Error('not hast token');

    const token = authHeader.split(' ')[1];
    payload = verifyToken(token);
    const { uid } = payload;
    req.uid = uid;
    // if (!uid) {
    //   throw new Error('Problems in token');
    // }
    next();
  } catch (error) {
    res.status(401).json({ err: 'Token no valid', error: error.message });
  }
};

module.exports = { validateJWT };
